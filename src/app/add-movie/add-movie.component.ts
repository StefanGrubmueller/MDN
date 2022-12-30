import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MovieType} from "../movieType";
import {ManageMoviesOfDbService} from "../shared/services/manage-movies-of-db.service";
import {v4 as uuidv4} from 'uuid';
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import {debounceTime} from "rxjs";
import {ImdbService} from "../shared/services/imdb.service";
import {ImdbDescription} from "../shared/types/imdb";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;
  searchResults: Array<ImdbDescription> = [];
  constructor(private formBuilder: FormBuilder,
              private db: AngularFirestore,
              private manageMovieService: ManageMoviesOfDbService,
              private imdbService: ImdbService) {
  }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        id: [null, []],
      },
    );
    this.addMovieForm.valueChanges.pipe(debounceTime(500)).subscribe((search) =>
      this.imdbService.getMovieListBasedOnSearch(search.name).subscribe((value) => {
        if (value.description) {
          this.searchResults = this.imdbService.getMappedMovieList(value);
        }
      })
    );
  }

  public setMovie(movie: ImdbDescription): void {
    this.addMovieForm.controls['name'].setValue(movie.title);
    this.addMovieForm.controls['id'].setValue(movie.imdb_id);
  }

  addMovie(): void {
    this.isImdbMovie() ? this.uploadImdbMovieToDatabase() :this.uploadNewlyCreatedMovieToDatabase();
  }

  private uploadNewlyCreatedMovieToDatabase() {
    const movieDetails = this.gatherDetailedMovieInformationIfAvailable();
    if (movieDetails.name !== '') {
      this.manageMovieService.uploadMovie(movieDetails);
    }
  }

  private uploadImdbMovieToDatabase() {
    this.imdbService.getImdbMovieDetails(this.addMovieForm.controls['id'].value).subscribe(movie => {
      if (movie.name !== '') {
        movie.meta = {uploadedOn: Timestamp.now()};
        this.manageMovieService.uploadMovie(movie);
      }
    });
  }

  private isImdbMovie() {
    return this.searchResults.find(m => m.title === this.addMovieForm.controls['name'].value) != null;
  }

  private gatherDetailedMovieInformationIfAvailable(): MovieType {
    return {
      name: this.addMovieForm.controls['name'].value.toUpperCase(),
      id: uuidv4(),
      meta: {uploadedOn: Timestamp.now()},
      liked: false
    }
  }
}
