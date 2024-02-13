import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  HostListener,
} from "@angular/core";
import { MovieType } from "../../../shared/types/movieType";
import { ScreenSize, getScreenSize } from "src/app/shared/types/screenSize";

@Component({
  selector: "app-movie-info-sm",
  templateUrl: "./movie-info-sm.component.html",
  styleUrls: ["./movie-info-sm.component.scss"],
})
export class MovieInfoSmComponent implements OnInit {
  @Input() movie: MovieType | undefined;
  @Input() loading: boolean | undefined;
  @Output() onAddMovie: EventEmitter<void> = new EventEmitter();
  @Output() onLikeMovie: EventEmitter<void> = new EventEmitter();

  public screenSize: ScreenSize = ScreenSize.SMALL;
  public openAddToPlaylistDialog: boolean = false;

  ngOnInit(): void {
    this.setScreenSize();
  }

  public addMovie(): void {
    this.onAddMovie.emit();
  }

  public likeMovie(): void {
    this.onLikeMovie.emit();
  }

  @HostListener("window:resize")
  private setScreenSize(): void {
    this.screenSize = getScreenSize();
  }

  protected readonly ScreenSize = ScreenSize;
  protected readonly getScreenSize = getScreenSize;
}
