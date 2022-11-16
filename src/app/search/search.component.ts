import {Component, OnInit} from '@angular/core';
import {User} from "../shared/types/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MovieType} from "../movieType";
import {ManageMoviesOfDbService} from "../shared/services/manage-movies-of-db.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {BehaviorSubject, debounceTime} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ImdbDescription} from "../shared/types/imdb";
import {ImdbService} from "../shared/services/imdb.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  allUsers: Array<User> = [];

  allMovies: Array<MovieType> = [];

  searchForm: FormGroup;

  searchResults: Array<ImdbDescription> = [];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private manageMovieService: ManageMoviesOfDbService,
              private router: Router,
              private http: HttpClient,
              private imdbService: ImdbService) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
        searchText: ['', []],
      },
    )
    this.allUsers = this.userService.geAllUsers();
    this.allMovies = this.manageMovieService.getAllMovies();
    this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe((values: any) => {
      if(values.searchText && values.searchText != '') {
        this.imdbService.getMovieListBasedOnSearch(values.searchText).subscribe((value) => {
          if (value.description) {
            this.searchResults = this.imdbService.getMappedMovieList(value);
          }
        });
      }
    })
  }

  public routeToMovie(movieId: string): void {
    this.router.navigate(['movie'], {queryParams: {movieId: movieId, imdb: false}})
  }

  public routeToIMDBMovie(movieId: string): void {
    this.router.navigate(['movie'], {queryParams: {movieId: movieId, imdb: true}})
  }

  public routeToUserProfile(userId: string): void {
    this.router.navigate(['user'], {queryParams: {userId: userId}})
  }

}
