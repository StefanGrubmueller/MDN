import {Component, HostListener, Input} from '@angular/core';
import {getScreenSize, ScreenSize} from "../shared/types/screenSize";
import {Router} from "@angular/router";
import {MovieType} from "../movieType";
import {ManageMoviesOfDbService} from "../shared/services/manage-movies-of-db.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MessageService],
})
export class MovieListComponent {
  @Input() movies: MovieType[] | undefined;

  screenSize: ScreenSize = ScreenSize.SMALL;

  constructor(private router: Router, private manageMoviesOfDbService: ManageMoviesOfDbService, private messageService: MessageService) {
  }

  public routeToMovieInfo(movieId: string): void {
    this.router.navigate(['movie'], { queryParams: { movieId: movieId } });
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMoviesOfDbService.updateMovie(movie);
  }

  public deleteMovie(movie: MovieType) {
    this.movies = this.movies?.filter((localMovie: MovieType) => {
      return movie.id !== localMovie.id;
    });
    this.manageMoviesOfDbService.deleteMovie(movie.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Movie Deleted',
    });
  }

  @HostListener('window:resize')
  private setScreenSize(): void {
    this.screenSize = getScreenSize();
  }

  protected readonly ScreenSize = ScreenSize;
}
