import { NgModule } from "@angular/core";
import { MainPageComponent } from "./movie/main-page/main-page.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { MovieInfoComponent } from "./movie/movie-info/movie-info.component";
import { SearchComponent } from "./search/search.component";
import { AddMovieComponent } from "./movie/add-movie/add-movie.component";
import { LibraryComponent } from "./library/library.component";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";
import { CreateProfileComponent } from "./user/create-profile/create-profile.component";
import { RegisterUsernameComponent } from "./registration/register-username/register-username.component";
import { RegisterEmailComponent } from "./registration/register-email/register-email.component";
import { RegisterPasswordComponent } from "./registration/register-password/register-password.component";
import { ResetPasswordComponent } from "./user/reset-password/reset-password.component";
import { RegisterFinishedComponent } from "./registration/register-finished/register-finished.component";
import { PlaylistsComponent } from "./playlists/playlists.component";
import { SuggestionsComponent } from "./movie/suggestions/suggestions.component";

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "HOME", component: MainPageComponent },
  { path: "login", component: LoginComponent },
  { path: "movie", component: MovieInfoComponent },
  { path: "user", component: UserProfileComponent },
  { path: "search", component: SearchComponent },
  { path: "ADD", component: AddMovieComponent },
  { path: "LIB", component: LibraryComponent },
  { path: "reset-password", component: ResetPasswordComponent },
  { path: "playlist", component: PlaylistsComponent },
  { path: "suggestions", component: SuggestionsComponent },
  {
    path: "register",
    component: CreateProfileComponent,
    children: [
      {
        path: "step-1",
        component: RegisterUsernameComponent,
      },
      {
        path: "step-2",
        component: RegisterEmailComponent,
      },
      {
        path: "step-3",
        component: RegisterPasswordComponent,
      },
      {
        path: "step-4",
        component: RegisterFinishedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
