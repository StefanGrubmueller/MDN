import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieType} from "../movieType";
import {ManageMoviesOfDbService} from "../shared/services/manage-movies-of-db.service";

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  movie: MovieType | undefined ;
  allMovies: Array<MovieType>;

  constructor(private activeRoute: ActivatedRoute, private manageMovieService: ManageMoviesOfDbService) { }

  ngOnInit(): void {
    this.allMovies = this.manageMovieService.getAllMovies();
    this.activeRoute.queryParams.pipe().subscribe((p) => {
      this.manageMovieService.downloadMovieInformation(p.movieId).subscribe(movie => this.movie = movie);
    })
  }

  public loadNewMovie(newMovie: MovieType) {
    this.movie = newMovie;
  }

}
