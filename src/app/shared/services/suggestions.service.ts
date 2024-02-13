import { Injectable } from '@angular/core';
import { ImdbService } from './imdb.service';
import { ManageMoviesOfDbService } from './manage-movies-of-db.service';
import { Observable, forkJoin, map, mergeMap, switchMap, take } from 'rxjs';
import * as _ from 'underscore';
import { MovieType, Suggestion } from 'src/app/movieType';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private localMovies$ = this.manageMovieService.getAllMovies$();
  constructor(private imdbService: ImdbService, private manageMovieService: ManageMoviesOfDbService) { }

  loadSuggestions(numberOfSuggestions: number): Observable<Suggestion[]> {
    return this.manageMovieService.getAllMovies$().pipe(
      switchMap((movies: MovieType[] | undefined) => {
        const suggestedMovieIds: string[] = movies ? _.sample(movies, numberOfSuggestions).map(movie => movie.id) : [];
        const suggestionObservables: Observable<any>[] = suggestedMovieIds.map((movieId: string) =>
          this.imdbService.getImdbMovieDetails(movieId)
        );
        return this.getSuggestionsFromObservables(suggestionObservables, movies ?? []);
      })
    );
  }

  private getSuggestionsFromObservables(observables: Observable<any>[], movies: MovieType[]): Observable<any[] > {
    return forkJoin(observables).pipe(
      map((movieDetails: any[]) => {
        const suggestions: any[] = [];
        movieDetails.forEach((movieDetail: any) => {
          if (movieDetail?.suggestions?.relatedMoviePosterUrl && movies?.filter(movie => movie.id === movieDetail.suggestions.suggestionId).length <= 0) {
            suggestions.push(movieDetail.suggestions);
          }
        });
        return suggestions;
      })
    );
  }
}
