import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieType } from '../movieType';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';
import { ImdbService } from '../shared/services/imdb.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
  providers: [MessageService],
})
export class MovieInfoComponent implements OnInit {
  movie: MovieType;
  allMovies: Array<MovieType>;
  newMovieFromList: MovieType;

  isImdb: boolean;
  alreadyWatched: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private manageMovieService: ManageMoviesOfDbService,
    private imdbService: ImdbService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.allMovies = this.manageMovieService.getAllMovies();
    this.activeRoute.queryParams.pipe(untilDestroyed(this)).subscribe((p) => {
      if (p.imdb === 'true') {
        this.isImdb = true;
        this.imdbService
          .getImdbMovieDetails(p.movieId)
          .pipe(untilDestroyed(this))
          .subscribe((value) => {
            this.movie = value;
          });
      } else {
        this.isImdb = false;
        this.manageMovieService
          .downloadMovieInformation(p.movieId)
          .pipe(untilDestroyed(this))
          .subscribe((movie) => {
            if (!movie) return;
            this.alreadyWatched =
              this.manageMovieService.movieIsAlreadyInUsersLib(movie);
            console.log('this.', this.alreadyWatched);
            return movie ? (this.movie = movie) : '';
          });
      }
    });
  }

  public loadNewMovie() {
    if (this.newMovieFromList?.imdb?.imdb_id) {
      this.isImdb = true;
      this.imdbService
        .getImdbMovieDetails(this.newMovieFromList.id)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          this.movie = value;
        });
    } else {
      this.isImdb = false;
      this.manageMovieService
        .downloadMovieInformation(this.newMovieFromList.id)
        .pipe(untilDestroyed(this))
        .subscribe((movie) => (movie ? (this.movie = movie) : ''));
    }
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMovieService.updateMovie(movie);
  }

  addMovieToDb() {
    this.manageMovieService.uploadMovie(this.movie);
    this.showMessage();
  }

  private showMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have added this movie to your library',
      life: 1000,
    });
  }
}
