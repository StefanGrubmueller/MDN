import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieType } from '../../movieType';
import { ImdbDescription } from '../types/imdb';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private _searchSubject = new BehaviorSubject<any>({});
  private _searchObservable = this._searchSubject.asObservable();

  private _detailsSubject = new BehaviorSubject<MovieType>({
    name: '',
    id: '',
    liked: false,
  });
  private _detailsObservable = this._detailsSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getImdbMovieDetails(movieId: string): Observable<MovieType> {
    return this.http
      .get(`https://search.imdbot.workers.dev/?tt=${movieId}`)
      .pipe(
        map((value: any) => {
          let mappedValue = this.mapToMovie(value);
          this._detailsSubject.next(mappedValue);
          return mappedValue;
        })
      );
  }

  public getMovieListBasedOnSearch(searchText: string | null): Observable<any> {
    this.http
      .get(`https://search.imdbot.workers.dev/?q=${searchText}`)
      .subscribe((value) => this._searchSubject.next(value));
    return this._searchObservable;
  }

  public getMappedMovieList(value: any): Array<ImdbDescription> {
    let movies: Array<ImdbDescription> = [];
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
        photo_width: jsonMovie['photo_width'],
      });
    });
    return movies;
  }

  private mapToMovie(value: any): MovieType {
    let actors: Array<string> = [];
    value.short.actor?.map((actor: any) => actors.push(actor.name));
    return {
      id: value.imdbId,
      author: value?.main?.creators[0]?.name
        ? value.main.creators[0].name
        : null,
      genre: value.short.genre,
      name: value.main.titleText.text ? value.main.titleText.text : false,
      liked: false,
      releaseDate: Timestamp.fromDate(
        new Date(
          `${value.main?.releaseDate?.year}-${value.main.releaseDate?.month}-${value.main.releaseDate?.day}`,
        ),
      ),
      rating: value.short.reviewbash
        ? value.short.review.reviewRating.ratingValue
        : null,
      imdb: {
        title: value.main.titleText.text,
        director: value?.short?.director ? value?.short?.director[0]?.name : null,
        imdb_id: value.imdbId,
        actors: actors,
        year: value.main.releaseYear.year,
        rank: value.main.ratingsSummary.topRanking
          ? value.main.ratingsSummary.topRanking.rank
          : null,
        img_poster: value.short.image,
      },
      titleImageUrl: value?.main?.titleMainImages?.edges[0]?.node?.url,
      titleImageUrlHeight: value?.main?.titleMainImages?.edges[0]?.node?.height,
      titleImageUrlWidth: value?.main?.titleMainImages?.edges[0]?.node?.width
    };
  }
}
