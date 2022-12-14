import {Component, Input, OnInit} from '@angular/core';
import {MovieType} from "../movieType";
import {Router} from "@angular/router";
import {ManageMoviesOfDbService} from "../shared/services/manage-movies-of-db.service";
import {UserService} from "../shared/services/user.service";
import {existingMovies} from "../shared/allMoviesBackup";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input()
  email: string = "";

  movies: Array<MovieType> = [];
  logged: boolean = false;

  constructor(private router: Router, private manageMoviesOfDbService: ManageMoviesOfDbService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.logged = this.userService.getUserStatus();
    if (!this.logged) {
      this.router.navigate(['login']);
    }
    this.movies = this.manageMoviesOfDbService.getAllMovies();
  }

  routeToMovieInfo(movieId: string): void {
    this.router.navigate(['movie'], {queryParams: {movieId: movieId}});
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMoviesOfDbService.updateMovie(movie);
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

  /*public addIdToExistingProdData() {
    let migratedMovies: Array<MovieType> = [];
    migratedMovies = existingMovies.map(movie => {
      return {
        ...movie,
        id: uuidv4(),
        meta: {uploadedOn: Timestamp.now()}
      }
    });

    this.manageMoviesOfDbService.uploadMovies(migratedMovies);

  }*/

}
