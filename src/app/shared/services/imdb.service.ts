import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MovieType} from "../../movieType";
import {ImdbDescription} from "../types/imdb";

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  searchSubject = new BehaviorSubject<any>({});
  searchObservable = this.searchSubject.asObservable();

  detailsSubject = new BehaviorSubject<MovieType>({name: '', id: '', liked: false});
  detailsObservable = this.detailsSubject.asObservable();
  constructor(private http: HttpClient) { }

  public getImdbMovieDetails(movieId: string): Observable<MovieType> {
    this.http.get(`https://search.imdbot.workers.dev/?tt=${movieId}`).subscribe((value: any) => {
      let mappedValue = this.mapToMovie(value);
      this.detailsSubject.next(mappedValue);
    });
    return this.detailsObservable;
  }

  public getMovieListBasedOnSearch(searchText: string): Observable<any> {
    this.http.get(`https://search.imdbot.workers.dev/?q=${searchText}`).subscribe((value) => this.searchSubject.next(value));
    return this.searchObservable;
  }

  public getMappedMovieList(value: any): Array<ImdbDescription> {
    let movies: Array<ImdbDescription> =[];
    value.description.map((movie: any) => {
      let jsonMovie = JSON.parse(JSON.stringify(movie));
      movies.push({
        title: jsonMovie['#TITLE'],
        actors: jsonMovie['#ACTORS'],
        imdb_id: jsonMovie['#IMDB_ID'],
        imdb_iv: jsonMovie['#IMDB_IV'],
        imdb_url: jsonMovie['#IMDB_URL'],
        img_poster: jsonMovie['#IMG_POSTER'],
        rank: jsonMovie['#RANK'],
        year: jsonMovie['#YEAR'],
        photo_height: jsonMovie['photo_height'],
        photo_width: jsonMovie['photo_width']
      });
    });
    return movies;
  }

  private mapToMovie(value: any): MovieType {
    let actors: Array<string> = [];
    value.short.actor.map((actor: any) => actors.push(actor.name));
    console.log('rank', value.main.ratingsSummary.topRanking ?value.main.ratingsSummary.topRanking : null);
    return {
      id: value.imdbId,
      author: value.short.creator[1].name ? value.short.creator[1].name : null,
      genre: value.short.genre,
      name: value.main.titleText.text,
      liked: false,
      releaseDate: new Date(`${value.main.releaseDate.year}-${value.main.releaseDate.month}-${value.main.releaseDate.day}`),
      rating: value.short.reviewbash ? value.short.review.reviewRating.ratingValue : null,
      imdb: {
        title: value.main.titleText.text,
        imdb_id: value.imdbId,
        actors: actors,
        year: value.main.releaseYear.year,
        rank: value.main.ratingsSummary.topRanking ?value.main.ratingsSummary.topRanking.rank : null,
        img_poster: value.short.image,
      }
    }
  }

}
