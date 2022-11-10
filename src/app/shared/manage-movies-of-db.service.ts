import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {MovieType} from "../movieType";

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
    this.dbCollection.doc(movie.name).set(movie);
    this.moviesFromDB.push(movie);
  }

  private downloadMovies(): void {
    this.dbCollection.ref.get().then((elem) => elem.docs.map(d => this.moviesFromDB.push(d.data())));
  }

  private getCollection(): AngularFirestoreCollection<MovieType> {
    // PROD COLLECTION
    return this.db.collection('stefan.grubmueller@icloud.com');

    // TEST COLLECTION
    //return this.db.collection('TEST@icloud.com');
  }
}
