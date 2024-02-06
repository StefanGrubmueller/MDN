import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieType } from '../movieType';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';
import { ImdbService } from '../shared/services/imdb.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { PlaylistService } from '../shared/services/playlist.service';
import { Playlist } from '../Playlist';
import { getScreenSize, ScreenSize } from '../shared/types/screenSize';
import { map } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
  providers: [MessageService],
})
export class MovieInfoComponent implements OnInit, OnDestroy {
  movie: MovieType;
  allMovies: Array<MovieType> | undefined;
  newMovieFromList: MovieType;

  // Flags
  loading = true;
  isImdb: boolean;
  isSearchResult = false;

  // Playlists
  openAddToPlaylistDialog = false;
  allPlaylists: Playlist[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private manageMovieService: ManageMoviesOfDbService,
    private imdbService: ImdbService,
    private messageService: MessageService,
    private playlistService: PlaylistService,
    private router: Router,
  ) {
    this.activeRoute.paramMap.subscribe((params) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    // Playlists
    this.playlistService
      .getAllPlaylistsForUser()
      .subscribe((playlists) => (this.allPlaylists = playlists || []));

    this.loading = true;

    this.manageMovieService
      .getAllMovies()
      .pipe(map((movies) => (this.allMovies = movies || [])));

    this.activeRoute.queryParams
      .subscribe((queryParams) => {
        const movieId = queryParams.movieId;
        this.isSearchResult = queryParams.isSearch;
        this.loadLocalMovieInformation(movieId);
        this.loadImdbMovieDetails(movieId);
      })
      .unsubscribe();
  }

  private loadImdbMovieDetails(movieId: string): void {
    this.isImdb = true;
    this.imdbService.getImdbMovieDetails(movieId).subscribe((value) => {
      this.movie = value;
      this.loading = false;
    });
  }

  private loadLocalMovieInformation(movieId: string): void {
    this.isImdb = false;

    this.manageMovieService
      .downloadMovieInformation(movieId)
      .subscribe((movie) => {
        if (!movie) {
          return;
        }

        if (movie?.watched) {
          this.movie.watched = movie.watched;
        }
        this.loading = false;
      });
  }

  public loadMovieSelectedFromSideBar() {
    if (this.newMovieFromList?.imdb?.imdb_id) {
      this.isImdb = true;
      this.loading = true;
      this.imdbService
        .getImdbMovieDetails(this.newMovieFromList.id)
        .subscribe((value) => {
          this.movie = value;
          this.loading = false;
        });
    } else {
      this.isImdb = false;
      this.manageMovieService
        .downloadMovieInformation(this.newMovieFromList.id)
        .subscribe((movie) => {
          return movie ? (this.movie = movie) : '';
        });
    }
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMovieService.updateMovie(movie);
  }

  public addMovieToDb(hasWatched: boolean) {
    if (!this.movie) return;
    this.movie.watched = hasWatched;
    this.manageMovieService.uploadMovie(this.movie);
    this.showMessage();
  }

  public addToPlaylist(playlist: Playlist) {
    if (!this.movie) return;
    this.playlistService.addMovieToPlaylist(this.movie, playlist);
    if (
      this.allMovies &&
      this.allMovies.filter((movie) => movie.id === this.movie?.id).length <= 0
    ) {
      this.addMovieToDb(false);
    }
    this.openAddToPlaylistDialog = false;
  }

  private showMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have added this movie to your library',
      life: 1000,
    });
  }

  ngOnDestroy(): void {
    this.loading = true;
  }

  protected readonly getScreenSize = getScreenSize;
  protected readonly ScreenSize = ScreenSize;
}
