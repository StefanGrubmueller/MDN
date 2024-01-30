import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieType} from '../movieType';
import {ManageMoviesOfDbService} from '../shared/services/manage-movies-of-db.service';
import {ImdbService} from '../shared/services/imdb.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MessageService} from 'primeng/api';
import {take} from "rxjs";
import {PlaylistService} from "../shared/services/playlist.service";
import {Playlist} from "../Playlist";

@UntilDestroy()
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
  providers: [MessageService, PlaylistService],
})
export class MovieInfoComponent implements OnInit, OnDestroy {
  movie: MovieType | null = null;
  allMovies: Array<MovieType>;
  newMovieFromList: MovieType;
  loading = true;
  isImdb: boolean;

  // Playlists
  openAddToPlaylistDialog = false;
  allPlaylists: Playlist[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private manageMovieService: ManageMoviesOfDbService,
    private imdbService: ImdbService,
    private messageService: MessageService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    // Playlists
    this.playlistService.getAllPlaylistsForUser().subscribe(playlists => this.allPlaylists = playlists);

    this.loading = true;
    this.movie = null;

    this.allMovies = this.manageMovieService.getAllMovies();
    this.activeRoute.queryParams.subscribe((queryParams) => {
      const isImdb = queryParams.imdb === 'true';
      const movieId = queryParams.movieId;

      if (isImdb) {
        this.loadImdbMovieDetails(movieId);
      } else {
        this.loadLocalMovieInformation(movieId);
      }
    }).unsubscribe();
  }

  private loadImdbMovieDetails(movieId: string): void {
    this.isImdb = true;
    this.imdbService.getImdbMovieDetails(movieId)
      .subscribe((value) => {
        this.movie = value;
        console.log("value", value)
        this.loading = false;
      });
  }

  private loadLocalMovieInformation(movieId: string): void {
    this.isImdb = false;

    this.manageMovieService.downloadMovieInformation(movieId)
      .pipe(untilDestroyed(this))
      .subscribe((movie) => {
        if (!movie) {
          return;
        }

        if (movie) {
          this.movie = movie;
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
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          this.movie = value;
          this.loading = false;
        });
    } else {
      this.isImdb = false;
      this.manageMovieService
        .downloadMovieInformation(this.newMovieFromList.id)
        .pipe(untilDestroyed(this))
        .subscribe((movie) => {
          return movie ? (this.movie = movie) : ''
        });
    }
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMovieService.updateMovie(movie);
  }

  public addMovieToDb() {
    if(!this.movie) return;
    this.manageMovieService.uploadMovie(this.movie);
    this.showMessage();
  }

  public addToPlaylist(playlist: Playlist) {
    if (!this.movie) return;
    this.playlistService.addMovieToPlaylist(this.movie, playlist);
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
    this.movie = null;
    this.loading = true;
  }
}
