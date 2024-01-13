import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MovieType } from '../movieType';
import { Router } from '@angular/router';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';
import { UserService } from '../shared/services/user.service';
import { ScreenSize } from '../shared/types/screenSize';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [MessageService],
})
export class MainPageComponent implements OnInit {
  @Input()
  email: string = '';

  screenSize: ScreenSize = ScreenSize.SMALL;
  localMovies: Array<MovieType> = [];
  logged: boolean = false;

  constructor(
    private router: Router,
    private manageMoviesOfDbService: ManageMoviesOfDbService,
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.setScreenSize();
    this.logged = this.userService.getUserStatus();
    if (!this.logged) {
      this.router.navigate(['login']);
    }
    this.initialLoadAllMovies();
  }

  public deleteMovie(movie: MovieType) {
    this.localMovies = this.localMovies.filter((localMovie: MovieType) => {
      return movie.id !== localMovie.id;
    });
    this.manageMoviesOfDbService.deleteMovie(movie.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Movie Deleted',
    });
  }

  public routeToMovieInfo(movieId: string): void {
    this.router.navigate(['movie'], { queryParams: { movieId: movieId } });
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMoviesOfDbService.updateMovie(movie);
  }

  public routeToNewEntry() {
    this.router.navigate(['ADD']);
  }

  private initialLoadAllMovies() {
    this.localMovies = this.manageMoviesOfDbService.getAllMovies();
  }

  @HostListener('window:resize')
  private setScreenSize(): void {
    if (window.innerWidth <= ScreenSize.SMALL) {
      this.screenSize = ScreenSize.SMALL;
    } else if (window.innerWidth <= ScreenSize.MEDIUM) {
      this.screenSize = ScreenSize.MEDIUM;
    } else {
      this.screenSize = ScreenSize.LARGE;
    }
  }

  protected readonly ScreenSize = ScreenSize;
}
