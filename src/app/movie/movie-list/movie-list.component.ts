import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { getScreenSize, ScreenSize } from "../../shared/types/screenSize";
import { Router } from "@angular/router";
import { MovieType } from "../../shared/types/movieType";
import { ManageMoviesOfDbService } from "../../shared/services/manage-movies-of-db.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"],
  providers: [MessageService],
})
export class MovieListComponent implements OnInit {
  @Input() movies: MovieType[] | undefined;
  @Input() showLikeIcon: boolean | undefined;
  @Input() searchValue: string | undefined;

  @Output() clearIconClicked: EventEmitter<MovieType> = new EventEmitter();

  screenSize: ScreenSize = ScreenSize.SMALL;

  constructor(
    private router: Router,
    private manageMoviesOfDbService: ManageMoviesOfDbService,
  ) {}

  ngOnInit(): void {
    this.setScreenSize();
  }

  public routeToMovieInfo(movieId: string): void {
    this.router.navigate(["movie"], { queryParams: { movieId: movieId } });
  }

  public likeMovie(movie: MovieType): void {
    //update liked attribute of movie in the db and the session and think about lazy loading
    movie.liked = !movie.liked;
    this.manageMoviesOfDbService.updateMovie(movie);
  }

  public deleteMovie(movie: MovieType) {
    this.clearIconClicked.emit(movie);
  }

  public movieIncludesSearchValue(movie: MovieType): boolean {
    if (!this.searchValue) {
      return true;
    }
    return movie?.name.toLowerCase().includes(this.searchValue?.toLowerCase());
  }

  @HostListener("window:resize")
  private setScreenSize(): void {
    this.screenSize = getScreenSize();
  }

  protected readonly ScreenSize = ScreenSize;
}
