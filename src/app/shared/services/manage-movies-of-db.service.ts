import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MovieType } from '../../movieType';
import { catchError, from, map, Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root',
})
export class ManageMoviesOfDbService {
  private _dbCollection: AngularFirestoreCollection<MovieType>;
  private _moviesFromDB: Array<MovieType> | undefined = undefined;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
  ) {
    this._dbCollection = this.getCollection();
  }

  public getAllMovies(): Observable<MovieType[] | undefined> {
    return this._moviesFromDB
      ? of(this._moviesFromDB)
      : this.fetchMoviesFromDB();
  }

  public clearAllMovies(): void {
    this._moviesFromDB = undefined;
  }

  public uploadMovie(movie: MovieType): void {
    movie.meta = { uploadedOn: Timestamp.now() };
    this._dbCollection.doc(movie.id).set(movie);
    if (!this._moviesFromDB) {
      this._moviesFromDB = [];
    }
    this._moviesFromDB.push(movie);
  }

  public deleteMovie(id: string): void {
    this._dbCollection.doc(id).delete();
  }

  public updateMovie(movie: MovieType): void {
    if (!this._moviesFromDB) {
      return;
    }
    // local => for instant sync to decrease reads from firebase
    const index = this._moviesFromDB.findIndex((item) => item.id === movie.id);
    if (index !== -1) {
      this._moviesFromDB[index] = movie;
    }
    // remote
    this._dbCollection.doc(movie.id).set(movie);
  }

  public downloadMovieInformation(
    id: string,
  ): Observable<MovieType | undefined> {
    return this._dbCollection.doc(id).valueChanges();
  }

  public movieIsAlreadyInUsersLib(movie: MovieType): boolean {
    if (!this._moviesFromDB) {
      return false;
    }
    return (
      this._moviesFromDB.filter((localMovie: MovieType) => {
        return movie?.imdb?.imdb_id === localMovie?.imdb?.imdb_id;
      }).length >= 1
    );
  }

  private getCollection(): AngularFirestoreCollection<MovieType> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    return this.db.collection(email);
  }

  private fetchMoviesFromDB(): Observable<MovieType[] | undefined> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    return from(
      this.db.collection(email).ref?.where('watched', '==', true).get(),
    ).pipe(
      map((elem) => this.sortMoviesAlphabetically(elem)),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of(null);
      }),
      map((data) => {
        const moviesFromDb = data?.map((d) => d.data() as MovieType);
        this._moviesFromDB = moviesFromDb;
        return moviesFromDb;
      }),
    );
  }

  private sortMoviesAlphabetically(
    elem: firebase.firestore.QuerySnapshot<unknown>,
  ) {
    return elem.docs.sort((a, b) =>
      (a.data() as MovieType)?.name > (b.data() as MovieType)?.name
        ? 1
        : (b.data() as MovieType)?.name > (a.data() as MovieType)?.name
          ? -1
          : 0,
    );
  }
}
