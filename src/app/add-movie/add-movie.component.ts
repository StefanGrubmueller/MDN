import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieType } from '../movieType';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';
import { v4 as uuidv4 } from 'uuid';
import { debounceTime, forkJoin } from 'rxjs';
import { ImdbService } from '../shared/services/imdb.service';
import { ImdbDescription } from '../shared/types/imdb';
import { MessageService } from 'primeng/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  providers: [MessageService, ManageMoviesOfDbService],
})
export class AddMovieComponent implements OnInit {
  addMovieForm: FormGroup;
  searchResults: Array<ImdbDescription> = [];
  selectedMovieId: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private manageMovieService: ManageMoviesOfDbService,
    private imdbService: ImdbService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      id: [null, []],
    });
    this.addMovieForm.valueChanges
      .pipe(debounceTime(500), untilDestroyed(this))
      .subscribe((search) => {
        // after adding value is cleared and value null should not be looked up in imdb db
        if (search.name != null) {
          this.imdbService
            .getMovieListBasedOnSearch(search.name)
            .pipe(untilDestroyed(this))
            .subscribe((value) => {
              if (value.description) {
                this.searchResults = this.imdbService.getMappedMovieList(value);
              }
            });
        }
      });
  }

  setMovieInSearchBar(movie: ImdbDescription): void {
    this.addMovieForm.controls['name'].setValue(movie.title);
    this.addMovieForm.controls['id'].setValue(movie.imdb_id);
    this.selectedMovieId = movie?.imdb_id;
  }

  addMovie(): void {
    this.isImdbMovie()
      ? this.uploadImdbMovieToDatabase()
      : this.uploadNewlyCreatedMovieToDatabase();

    this.showMessage(true);
    this.clearForm();
  }

  private clearForm() {
    this.addMovieForm.reset();
    this.searchResults = [];
  }

  private showMessage(success: boolean) {
    if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You have added this movie to your library',
        life: 1000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'There has been some problem. It could be that you have already added this movie or that our services experience some kind of issues. Please try later.',
        life: 1000,
      });
    }
  }

  private uploadNewlyCreatedMovieToDatabase(): boolean {
    const movieDetails = this.gatherDetailedMovieInformationIfAvailable();
    if (movieDetails.name !== '') {
      this.manageMovieService.uploadMovie(movieDetails);
    }
    return true;
  }

  private uploadImdbMovieToDatabase(): boolean {
    let success: boolean = false;

    forkJoin(
      this.imdbService.getImdbMovieDetails(
        this.addMovieForm.controls['id'].value,
      ),
    ).subscribe(
      (value) => {},
      (error) => {},
    );
    this.imdbService
      .getImdbMovieDetails(this.addMovieForm.controls['id'].value)
      .pipe(untilDestroyed(this))
      .subscribe((movie) => {
        if (
          movie.name !== '' &&
          !this.manageMovieService.movieIsAlreadyInUsersLib(movie)
        ) {
          this.manageMovieService.uploadMovie(movie);
          success = true;
        }
        return success;
      });
    return success;
  }

  private isImdbMovie() {
    return (
      this.searchResults.find(
        (movie) => movie.title === this.addMovieForm.controls['name'].value,
      ) != null
    );
  }

  private gatherDetailedMovieInformationIfAvailable(): MovieType {
    return {
      name: this.addMovieForm.controls['name'].value.toUpperCase(),
      id: uuidv4(),
      liked: false,
    };
  }
}
