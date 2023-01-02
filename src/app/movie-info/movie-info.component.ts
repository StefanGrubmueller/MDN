import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieType} from "../movieType";
import {ManageMoviesOfDbService} from "../shared/services/manage-movies-of-db.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {ImdbService} from "../shared/services/imdb.service";

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  movie: MovieType;
  allMovies: Array<MovieType>;

  isImdb: boolean;

  constructor(private activeRoute: ActivatedRoute, private manageMovieService: ManageMoviesOfDbService, private imdbService: ImdbService) {
  }

  ngOnInit(): void {
    this.allMovies = this.manageMovieService.getAllMovies();
    this.activeRoute.queryParams.pipe().subscribe((p) => {
      if (p.imdb === 'true') {
        this.isImdb = true;
        this.imdbService.getImdbMovieDetails(p.movieId).subscribe(value => {
          console.log('movie', value);
          this.movie = value;
        });
      } else {
        this.isImdb = false;
        this.manageMovieService.downloadMovieInformation(p.movieId).subscribe(movie => movie ? this.movie = movie : '');
      }
    });
  }

  public loadNewMovie(newMovie: MovieType) {
    this.movie = newMovie;
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMovieService.updateMovie(movie);
  }
}
