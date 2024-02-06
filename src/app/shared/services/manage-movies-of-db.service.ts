import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/compat/firestore';
import {MovieType} from '../../movieType';
import {Observable, Subject} from 'rxjs';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root',
})
export class ManageMoviesOfDbService {
  private _dbCollection: AngularFirestoreCollection<MovieType>;
  private _moviesFromDB: Array<MovieType> = [];
  private _$moviesFromDBO: Subject<MovieType[]> = new Subject<MovieType[]>();

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this._dbCollection = this.getCollection();
    this.downloadAllMoviesFromFirebase();
  }

  public update() {
    this.downloadAllMoviesFromFirebase();
  }

  public getAllMovies(): Array<MovieType> {
    return this._moviesFromDB;
  }

  public getAllMoviesSub(): Subject<MovieType[]> {
    return this._$moviesFromDBO;
  }

  public clearAllMovies(): void {
    this._moviesFromDB = [];
  }

  public uploadMovie(movie: MovieType): void {
    movie.meta = { uploadedOn: Timestamp.now() };
    this._dbCollection.doc(movie.id).set(movie);
    this._moviesFromDB.push(movie);
  }

  public deleteMovie(id: string): void {
    this._dbCollection.doc(id).delete();
  }

  public updateMovie(movie: MovieType): void {
    // local => for instant sync to decrease reads from firebase
    const index = this._moviesFromDB.findIndex(item => item.id === movie.id);
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
    console.log("m", this._moviesFromDB, movie)
    return (
      this._moviesFromDB.filter((localMovie: MovieType) => {
        return movie?.imdb?.imdb_id === localMovie?.imdb?.imdb_id;
      }).length >= 1
    );
  }

  private downloadAllMoviesFromFirebase(): void {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    this.db
      .collection(email)
      .ref
      .where("watched", "==", true)
      .get()
      .then((elem) => {
        this._moviesFromDB.pop();
        const movieArray = elem.docs.sort((a,b) => ((a.data() as MovieType)?.name > (b.data() as MovieType)?.name) ? 1 : (((b.data() as MovieType)?.name > (a.data() as MovieType)?.name) ? -1 : 0));
        movieArray.map((d) => {
          this._moviesFromDB.push(<MovieType>d.data());
        });
        this._$moviesFromDBO.next(this._moviesFromDB);
      });
  }

  private getCollection(): AngularFirestoreCollection<MovieType> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    return this.db.collection(email);
  }


}
