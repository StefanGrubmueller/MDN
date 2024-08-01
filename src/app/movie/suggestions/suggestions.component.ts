import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { SuggestionsService } from "../../shared/services/suggestions.service";
import { Suggestion } from "../../shared/types/movieType";
import { Router } from "@angular/router";
import { ScreenSize } from "src/app/shared/types/screenSize";

@Component({
  selector: "app-suggestions",
  templateUrl: "./suggestions.component.html",
  styleUrls: ["./suggestions.component.scss"],
})
export class SuggestionsComponent {
  isLoading: boolean = false;
  smallScreenSize = ScreenSize.SMALL;
  sugestions: Suggestion[] = [];

  @Input({ required: true }) screenSize: any;

  constructor(
    private router: Router,
    private suggestionService: SuggestionsService,
    private cd: ChangeDetectorRef,
  ) {
    this.loadSuggestions();
  }

  public loadSuggestions() {
    this.isLoading = true;
    this.suggestionService
      .loadSuggestions(200)
      .subscribe({
        next: (suggestions: Suggestion[]) => {
          this.sugestions = suggestions;
          this.isLoading = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  public routeToMovieInfo(movieId: string): void {
    this.router.navigate(["movie"], { queryParams: { movieId: movieId } });
  }
}
