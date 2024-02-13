import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MovieType } from "../../shared/types/movieType";
import { ImdbDescription } from "../types/imdb";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import { ImdbApiService } from "./imdb-api.service";

@Injectable({
  providedIn: "root",
})
export class ImdbService {
  private searchSubject = new BehaviorSubject<any>({});
  private searchObservable = this.searchSubject.asObservable();

  private _detailsSubject = new BehaviorSubject<MovieType>({
    name: "",
    id: "",
    liked: false,
  });

  constructor(private imdbApi: ImdbApiService) {}

  public getImdbMovieDetails(movieId: string): Observable<MovieType> {
    return this.imdbApi.movieDetails(movieId).pipe(
      map((value: any) => {
        let mappedValue = this.mapToMovie(value);
        this._detailsSubject.next(mappedValue);
        return mappedValue;
      }),
    );
  }

  public getMovieListBasedOnSearch(searchText: string | null): Observable<any> {
    this.imdbApi
      .search(searchText ?? "")
      .subscribe((value: any) => this.searchSubject.next(value));
    return this.searchObservable;
  }

  public getMappedMovieList(value: any): Array<ImdbDescription> {
    let movies: Array<ImdbDescription> = [];
    value.description.map((movie: any) => {
      let jsonMovie = JSON.parse(JSON.stringify(movie));
      movies.push({
        title: jsonMovie["#TITLE"],
        actors: jsonMovie["#ACTORS"],
        imdb_id: jsonMovie["#IMDB_ID"],
        imdb_iv: jsonMovie["#IMDB_IV"],
        imdb_url: jsonMovie["#IMDB_URL"],
        img_poster: jsonMovie["#IMG_POSTER"],
        rank: jsonMovie["#RANK"],
        year: jsonMovie["#YEAR"],
        photo_height: jsonMovie["photo_height"],
        photo_width: jsonMovie["photo_width"],
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
        director: value?.short?.director
          ? value?.short?.director[0]?.name
          : null,
        imdb_id: value.imdbId,
        actors: actors,
        year: value.main.releaseYear?.year,
        rank: value.main.ratingsSummary.topRanking
          ? value.main.ratingsSummary.topRanking.rank
          : null,
        img_poster: value.short.image,
      },
      titleImageUrl: value?.main?.titleMainImages?.edges[0]?.node?.url,
      titleImageUrlHeight: value?.main?.titleMainImages?.edges[0]?.node?.height,
      titleImageUrlWidth: value?.main?.titleMainImages?.edges[0]?.node?.width,
      suggestions: {
        relatedMoviePosterUrl:
          value?.main?.moreLikeThisTitles?.edges[0]?.node?.primaryImage?.url,
        suggestionId: value?.main?.moreLikeThisTitles?.edges[0]?.node?.id,
      },
    };
  }
}
