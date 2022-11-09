import {Injectable} from '@angular/core';
import {MovieType} from "../movieType";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesFromDBService {

  dbConnection: any;
  moviesFromDB: Array<MovieType> = [];

  constructor(private db: AngularFirestore) {
    this.downloadMovies();
  }

  public getAllMovies(): Array<MovieType> {
    return this.moviesFromDB;
  }

  private downloadMovies(): void {
    this.dbConnection = this.db.collection('stefan.grubmueller@icloud.com').valueChanges();
    this.dbConnection.subscribe((movies: Array<MovieType>) => movies.map((movie: MovieType) => this.moviesFromDB.push(movie)));
    console.log('this.moviesFromDB', this.moviesFromDB);
  }
}
