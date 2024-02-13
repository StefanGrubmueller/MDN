import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { MovieType, Suggestion } from "../../shared/types/movieType";
import { Router } from "@angular/router";
import { ManageMoviesOfDbService } from "../../shared/services/manage-movies-of-db.service";
import { UserService } from "../../shared/services/user.service";
import { getScreenSize, ScreenSize } from "../../shared/types/screenSize";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { PlaylistService } from "../../shared/services/playlist.service";
import { Playlist } from "../../shared/types/Playlist";
import * as _ from "underscore";
import { UntilDestroy } from "@ngneat/until-destroy";
import { SuggestionsService } from "../../shared/services/suggestions.service";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  @Input()
  email: string = "";

  searchValue: string = "";
  screenSize: ScreenSize = ScreenSize.SMALL;
  localMovies$: Observable<MovieType[] | undefined> =
    this.manageMoviesOfDbService.getAllMovies$();
  logged: boolean = false;
  sugestions: Suggestion[] = [];

  constructor(
    private router: Router,
    private manageMoviesOfDbService: ManageMoviesOfDbService,
    private userService: UserService,
    private messageService: MessageService,
    private playlistService: PlaylistService,
    private cd: ChangeDetectorRef,
    private suggestionService: SuggestionsService,
  ) {}

  ngOnInit(): void {
    this.localMovies$ = this.manageMoviesOfDbService.getAllWatchedMovies$();
    this.loadSuggestions();
    this.setScreenSize();
    this.logged = this.userService.getUserStatus();
    if (!this.logged) {
      this.router.navigate(["login"]);
    }
  }

  public routeToNewEntry() {
    this.router.navigate(["ADD"]);
  }

  public deleteMovie(movie: MovieType) {
    this.manageMoviesOfDbService.deleteMovie(movie.id);
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Movie Deleted",
    });
  }

  public getTotalLikedMovies(movies: MovieType[]) {
    return movies.filter((movie) => movie.liked).length;
  }

  public getTotalNumberOfPlaylists(): Observable<Playlist[] | undefined> {
    return this.playlistService.getAllPlaylistsForUser();
  }

  public routeToMovieInfo(movieId: string): void {
    this.router.navigate(["movie"], { queryParams: { movieId: movieId } });
  }

  public loadSuggestions() {
    this.suggestionService
      .loadSuggestions(26)
      .subscribe((suggestions: Suggestion[]) => {
        this.sugestions = suggestions;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  @HostListener("window:resize")
  private setScreenSize(): void {
    this.screenSize = getScreenSize();
  }

  protected readonly ScreenSize = ScreenSize;
}
