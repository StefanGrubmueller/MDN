import { Component } from "@angular/core";
import { SuggestionsService } from "../../shared/services/suggestions.service";
import { Suggestion } from "../../shared/types/movieType";
import { Router } from "@angular/router";

@Component({
  selector: "app-suggestions",
  templateUrl: "./suggestions.component.html",
  styleUrls: ["./suggestions.component.scss"],
})
export class SuggestionsComponent {
  sugestions: Suggestion[] = [];

  constructor(
    private router: Router,
    private suggestionService: SuggestionsService,
  ) {
    this.loadSuggestions();
  }

  public loadSuggestions() {
    this.suggestionService
      .loadSuggestions(200)
      .subscribe((suggestions: Suggestion[]) => {
        this.sugestions = suggestions;
        console.log("this.", this.sugestions);
      });
  }

  public routeToMovieInfo(movieId: string): void {
    this.router.navigate(["movie"], { queryParams: { movieId: movieId } });
  }
}
