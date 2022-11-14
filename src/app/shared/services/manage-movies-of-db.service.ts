import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {MovieType} from "../../movieType";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageMoviesOfDbService {

  dbCollection: AngularFirestoreCollection<MovieType>;
  moviesFromDB: Array<MovieType> = [];

  constructor(private db: AngularFirestore) {
    // PROD
    this.dbCollection = this.getCollection();
    this.downloadMovies();
  }

  public getAllMovies(): Array<MovieType> {
    // return existingMovies; // TEST
    return this.moviesFromDB; // PROD
  }

  public uploadMovie(movie: MovieType): void {
    this.dbCollection.doc(movie.id).set(movie);
    this.moviesFromDB.push(movie);
  }

  public updateMovie(movie: MovieType): void {
    this.dbCollection.doc(movie.id).set(movie);
  }

  /*public uploadMovies(movies: Array<MovieType>): void {
    for(let movie of movies) {
      this.dbCollection.doc(movie.id).set(movie);
    }
  }*/

  public downloadMovieInformation(id: string): Observable<MovieType | undefined> {
    return this.dbCollection.doc(id).valueChanges();
  }

  private downloadMovies(): void {
    this.dbCollection.ref.get().then((elem) => elem.docs.map(d => this.moviesFromDB.push(d.data())));
  }

  private getCollection(): AngularFirestoreCollection<MovieType> {
    // PROD COLLECTION
    const email = JSON.parse(localStorage.getItem('user') ?? '').email;
    return this.db.collection(email);


    // TEST COLLECTION
    //return this.db.collection('TEST@icloud.com');
  }
}
