import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page/main-page.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MovieInfoComponent} from "./movie-info/movie-info.component";
import {SearchComponent} from "./footer/search/search.component";
import {AddMovieComponent} from "./footer/add-movie/add-movie.component";
import {LibraryComponent} from "./footer/library/library.component";


const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'movie', component: MovieInfoComponent},
  { path: 'search', component: SearchComponent},
  { path: 'addMovie', component: AddMovieComponent},
  { path: 'library', component: LibraryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
