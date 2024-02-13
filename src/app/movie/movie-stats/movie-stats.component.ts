import { Component, Input } from "@angular/core";
import { MovieType } from "../../shared/types/movieType";

@Component({
  selector: "app-movie-stats",
  templateUrl: "./movie-stats.component.html",
  styleUrls: ["./movie-stats.component.scss"],
})
export class MovieStatsComponent {
  @Input() movie: MovieType | undefined;
}
