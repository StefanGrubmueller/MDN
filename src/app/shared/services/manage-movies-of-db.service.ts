import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MovieType } from '../../movieType';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root',
})
export class ManageMoviesOfDbService {
  private _dbCollection: AngularFirestoreCollection<MovieType>;
  private _moviesFromDB: Array<MovieType> = [];

  constructor(private db: AngularFirestore) {
    this._dbCollection = this.getCollection();
    this.downloadAllMoviesFromFirebase();
  }

  public update() {
    this.downloadAllMoviesFromFirebase();
  }

  public getAllMovies(): Array<MovieType> {
    return this._moviesFromDB;
  }

  public clearAllMovies(): void {
    this._moviesFromDB = [];
  }

  public uploadMovie(movie: MovieType): void {
    movie.meta = { uploadedOn: Timestamp.now() };
    this._dbCollection.doc(movie.id).set(movie);
    this._moviesFromDB.push(movie);
  }

  public getAllLikedMovies(): MovieType[] {
    return this._moviesFromDB.filter((movie: MovieType) => {
      return movie.liked;
    });
  }

  public deleteMovie(id: string): void {
    this._dbCollection.doc(id).delete();
  }

  public updateMovie(movie: MovieType): void {
    this._dbCollection.doc(movie.id).set(movie);
  }

  public downloadMovieInformation(
    id: string,
  ): Observable<MovieType | undefined> {
    return this._dbCollection.doc(id).valueChanges();
  }

  public movieIsAlreadyInUsersLib(movie: MovieType): boolean {
    console.log('m', movie);
    return (
      this._moviesFromDB.filter((localMovie) => {
        return movie?.imdb?.imdb_id === localMovie?.imdb?.imdb_id;
      }).length >= 1
    );
  }

  private downloadAllMoviesFromFirebase(): void {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    this.db
      .collection(email)
      .ref?.orderBy('name')
      .get()
      .then((elem) => {
        this._moviesFromDB.pop();
        elem.docs.map((d) => {
          this._moviesFromDB.push(<MovieType>d.data());
        });
      });
  }

  private getCollection(): AngularFirestoreCollection<MovieType> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    return this.db.collection(email);
  }
}
