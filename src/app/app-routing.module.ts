import {NgModule} from '@angular/core';
import {MainPageComponent} from "./main-page/main-page.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MovieInfoComponent} from "./movie-info/movie-info.component";
import {SearchComponent} from "./search/search.component";
import {AddMovieComponent} from "./add-movie/add-movie.component";
import {LibraryComponent} from "./library/library.component";
import {RegisterComponent} from "./register/register.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'movie', component: MovieInfoComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'search', component: SearchComponent},
  {path: 'addMovie', component: AddMovieComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
