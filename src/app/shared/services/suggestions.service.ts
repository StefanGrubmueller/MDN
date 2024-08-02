import { Injectable } from "@angular/core";
import { ImdbService } from "./imdb.service";
import { ManageMoviesOfDbService } from "./manage-movies-of-db.service";
import { Observable, catchError, forkJoin, map, switchMap, tap } from "rxjs";
import * as _ from "underscore";
import { MovieType, Suggestion } from "../types/movieType";

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  constructor(
    private imdbService: ImdbService,
    private manageMovieService: ManageMoviesOfDbService
  ) { }

  loadSuggestions(numberOfSuggestions: number): Observable<Suggestion[]> {
    return this.getAllMovies().pipe(
      switchMap((movies: MovieType[] | undefined) => {
        const movieIds = this.getRandomMovieIds(movies, numberOfSuggestions);
        return this.fetchMovieSuggestions(movieIds, movies ?? []);
      })
    );
  }

  private getAllMovies(): Observable<MovieType[] | undefined> {
    return this.manageMovieService.getAllMovies$();
  }

  private getRandomMovieIds(movies: MovieType[] | undefined, count: number): string[] {
    if (!movies) return [];
    return _.sample(movies, count)
      .map(movie => movie.id)
      .filter(id => id != null) as string[];
  }

  private fetchMovieSuggestions(
    movieIds: string[],
    allMovies: MovieType[]
  ): Observable<Suggestion[]> {
    const suggestionRequests = movieIds.map(id => this.imdbService.getImdbMovieDetails(id));
    return this.extractSuggestions(suggestionRequests, allMovies);
  }

  private extractSuggestions(
    observables: Observable<any>[],
    allMovies: MovieType[]
  ): Observable<Suggestion[]> {
    return forkJoin(observables).pipe(
      map(movieDetails => this.processMovieDetails(movieDetails, allMovies))
    );
  }

  private processMovieDetails(
    movieDetails: any[],
    allMovies: MovieType[]
  ): Suggestion[] {
    return movieDetails.reduce((suggestions: Suggestion[], detail: any) => {
      if (this.isValidSuggestion(detail, allMovies)) {
        suggestions.push(detail.suggestions);
      }
      return suggestions;
    }, []);
  }

  private isValidSuggestion(detail: any, allMovies: MovieType[]): boolean {
    return (
      detail?.suggestions?.relatedMoviePosterUrl &&
      !allMovies.some(movie => movie.id === detail.suggestions.suggestionId)
    );
  }
}