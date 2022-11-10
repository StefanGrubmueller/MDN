import {Component, Input, OnInit} from '@angular/core';
import {MovieType} from "../movieType";
import {Router} from "@angular/router";
import {ManageMoviesOfDbService} from "../shared/manage-movies-of-db.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input()
  email: string = "";

  movies: Array<MovieType> = [];

  constructor(private router: Router, private getDBMovieService: ManageMoviesOfDbService) {
  }

  ngOnInit(): void {
    this.movies = this.getDBMovieService.getAllMovies();
  }

  routeToMovieInfo(movie: MovieType): void {
    this.router.navigate(['movie'], {queryParams: {movieName: movie.name}});
  }

  // importExistingMovies() {
  //   const movieCollection = this.db.collection('stefan.grubmueller@icloud.com');
  //   this.existingMovies.forEach(existingMovie => {
  //     movieCollection.doc(existingMovie).set({name: existingMovie});        console.log('finished');
  //
  //   });
  // }
  //
  // deleteExistingMovies() {
  //   const movieCollection = this.db.collection('stefan.grubmueller@icloud.com');
  //     this.existingMovies.forEach(existingMovie => {
  //       movieCollection.doc(existingMovie).delete();
  //       console.log('finished');
  //     });
  // }

}
