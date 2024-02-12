import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MovieType } from '../../movieType';
import { catchError, from, map, Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root',
})
export class ManageMoviesOfDbService {
  private _dbCollection: AngularFirestoreCollection<MovieType> = this.getCollection();
  private _cachedWatchedMovies: Array<MovieType> | undefined = undefined;
  private _cachedAllMovies: Array<MovieType> | undefined = undefined;

  constructor(
    private db: AngularFirestore
  ) {}

  public getAllMovies$(): Observable<MovieType[] | undefined> {
    return this._cachedAllMovies !== undefined && this._cachedAllMovies.length > 0
      ? of(this._cachedAllMovies)
      : this.fetchAllMoviesFromDB$();
  }

  public getAllWatchedMovies$(): Observable<MovieType[] | undefined> {
    return this._cachedWatchedMovies !== undefined && this._cachedWatchedMovies.length > 0
      ? of(this._cachedWatchedMovies)
      : this.fetchWatchedMoviesFromDB$();
  }

  public clearAllMovies(): void {
    this._cachedWatchedMovies = undefined;
  }

  public reload(): void {
    this._cachedWatchedMovies = undefined;
    this.fetchAllMoviesFromDB$();
  }

  public uploadMovie(movie: MovieType): void {
    movie.meta = { uploadedOn: Timestamp.now() };
    this._cachedAllMovies?.push(movie); 
    this._dbCollection.doc(movie.id).set(movie);
    if (!this._cachedWatchedMovies) {
      this._cachedWatchedMovies = [];
    }
    
  }

  public deleteMovie(id: string): void {
    this._cachedAllMovies = this._cachedAllMovies?.filter((localMovie: MovieType) => {
      return id !== localMovie.id;
    });
    this._cachedWatchedMovies = this._cachedWatchedMovies?.filter(movie => movie.id !== id);
    this._dbCollection.doc(id).delete();
  }

  public updateMovie(movie: MovieType): void {
    if (!this._cachedWatchedMovies) {
      return;
    }
    // local => for instant sync to decrease reads from firebase
    const index = this._cachedWatchedMovies.findIndex((item) => item.id === movie.id);
    if (index !== -1) {
      this._cachedWatchedMovies[index] = movie;
    }
    console.log("t", this._cachedWatchedMovies);
    
    // remote
    this._dbCollection.doc(movie.id).set(movie);
  }

  public downloadMovieInformation(
    id: string,
  ): Observable<MovieType | undefined> {
    return this._dbCollection.doc(id).valueChanges();
  }

  public movieIsAlreadyInUsersLib(movie: MovieType): boolean {
    if (!this._cachedWatchedMovies) {
      return false;
    }
    return (
      this._cachedWatchedMovies.filter((localMovie: MovieType) => {
        return movie?.imdb?.imdb_id === localMovie?.imdb?.imdb_id;
      }).length >= 1
    );
  }

  private getCollection(): AngularFirestoreCollection<MovieType> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    return this.db.collection(email);
  }

  private fetchAllMoviesFromDB$(): Observable<MovieType[] | undefined> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    if(!this.db.collection(email).ref){
        return of();
    }
    return from(
      this.db.collection(email).get(),
    ).pipe(
      map((elem) => this.sortMoviesSnapshotByName(elem)),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of(null);
      }),
      map((data) => {
        const moviesFromDb = data?.map((d) => d.data() as MovieType);
        this._cachedAllMovies = moviesFromDb;
        return moviesFromDb;
      }),
    );
  }

  private fetchWatchedMoviesFromDB$(): Observable<MovieType[] | undefined> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    if(!this.db.collection(email).ref){
        return of();
    }
    return from(
      this.db.collection(email).ref?.where('watched', '==', true).get(),
    ).pipe(
      map((elem) => this.sortMoviesSnapshotByName(elem)),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of(null);
      }),
      map((data) => {
        const moviesFromDb = data?.map((d) => d.data() as MovieType);
        this._cachedWatchedMovies = moviesFromDb;
        return moviesFromDb;
      }),
    );
  }

  private sortMoviesSnapshotByName(
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
