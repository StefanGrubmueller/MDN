import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { User } from '../shared/types/User';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ImdbDescription } from '../shared/types/imdb';
import { ImdbService } from '../shared/services/imdb.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  allUsers: Array<User> = [];
  searchResults: Array<ImdbDescription> = [];
  searchValue: string | null;

  constructor(
    private userService: UserService,
    private router: Router,
    private imdbService: ImdbService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.allUsers = this.userService.geAllUsers();
  }

  search(searchString: string | null) {
    this.imdbService
      .getMovieListBasedOnSearch(searchString)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value.description) {
          this.searchResults = this.imdbService.getMappedMovieList(value);
        }
      });
  }

  gotoSearchResult(event: any) {
    const searchResult = event.value;
    if (searchResult?.imdb_id) {
      this.routeToIMDBMovie(searchResult.imdb_id);
      this.searchValue = null;
    }
  }

  clearSearchText() {
    this.searchValue = null;
  }

  public routeToMovie(movieId: string): void {
    this.router.navigate(['movie'], {
      queryParams: { movieId: movieId, imdb: false },
    });
  }

  //has to be implemented - search and show other not yet added movies
  public routeToIMDBMovie(movieId: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['movie'], {
        queryParams: { movieId: movieId, imdb: true, isSearch: true },
      });
    });
  }

  //has to be implemented - search and show other users
  public routeToUserProfile(userId: string): void {
    this.router.navigate(['user'], { queryParams: { userId: userId } });
  }
}
