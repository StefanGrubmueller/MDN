/*// db.ts
import Dexie, {Table} from 'dexie';
import {MovieType} from "./app/movieType";

export class IndexMovieDB extends Dexie {

  downloadedMovies!: Table<Array<MovieType>, number>;


  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      downloadedMovies: '++id',
    });
    // From tutorial, dont want to use it this way
    //this.on('populate', () => this.populate());
  }

  async populate(movies: Array<MovieType>) {
    const mappedMovies = movies.map((movie: MovieType) => {
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
    })
    await indexMovieDB.downloadedMovies.add(mappedMovies);
  }
}

export const indexMovieDB = new IndexMovieDB();
*/
