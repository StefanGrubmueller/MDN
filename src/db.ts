// db.ts
import Dexie, {Table} from 'dexie';
import {MovieType} from "./app/movieType";
import {Input, OnChanges, SimpleChanges} from "@angular/core";

export class IndexMovieDB extends Dexie implements OnChanges {

  @Input()
  movies: Array<MovieType>;

  downloadedMovies!: Table<MovieType, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      downloadedMovies: '++id',
    });
    // From tutorial, dont want to use it this way
    //this.on('populate', () => this.populate());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.movies && changes.movies.currentValue) {
      db.downloadedMovies = changes.movies.currentValue.map((movie: MovieType) => {
        return {
          name: movie.name,
          author: movie.author,
          genre: movie.genre,

          //id: movie.id
          //rating: movie.rating,
          //releaseDate: movie.releaseDate,
          //watchDate: movie.watchDate,
          //id: movie.id
        }
      });
    }
  }
}

export const db = new IndexMovieDB();
