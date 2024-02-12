import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { MovieType } from '../movieType';
import { Router } from '@angular/router';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';
import { UserService } from '../shared/services/user.service';
import { getScreenSize, ScreenSize } from '../shared/types/screenSize';
import { MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { PlaylistService } from '../shared/services/playlist.service';
import { Playlist } from '../Playlist';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  @Input()
  email: string = '';

  searchValue: string = '';

  screenSize: ScreenSize = ScreenSize.SMALL;
  localMovies$: Observable<MovieType[] | undefined> =
    this.manageMoviesOfDbService.getAllMovies$();
  logged: boolean = false;

  constructor(
    private router: Router,
    private manageMoviesOfDbService: ManageMoviesOfDbService,
    private userService: UserService,
    private messageService: MessageService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.localMovies$ = this.manageMoviesOfDbService.getAllWatchedMovies$();
    this.setScreenSize();
    this.logged = this.userService.getUserStatus();
    if (!this.logged) {
      this.router.navigate(['login']);
    }
  }

  public routeToNewEntry() {
    this.router.navigate(['ADD']);
  }

  public deleteMovie(movie: MovieType) {
    this.manageMoviesOfDbService.deleteMovie(movie.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Movie Deleted',
    });
  }

  public getTotalLikedMovies(movies: MovieType[]) {
    return movies.filter((movie) => movie.liked).length;
  }

  public getTotalNumberOfPlaylists(): Observable<Playlist[] | undefined> {
    return this.playlistService.getAllPlaylistsForUser();
  }


  @HostListener('window:resize')
  private setScreenSize(): void {
    this.screenSize = getScreenSize();
  }

  protected readonly ScreenSize = ScreenSize;
}
