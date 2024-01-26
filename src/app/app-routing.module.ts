import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { SearchComponent } from './search/search.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { LibraryComponent } from './library/library.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { RegisterUsernameComponent } from './register-username/register-username.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterFinishedComponent } from './register-finished/register-finished.component';
import { PlaylistsComponent } from './playlists/playlists.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'HOME', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie', component: MovieInfoComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'ADD', component: AddMovieComponent },
  { path: 'LIB', component: LibraryComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'playlist', component: PlaylistsComponent },
  {
    path: 'register',
    component: CreateProfileComponent,
    children: [
      {
        path: 'step-1',
        component: RegisterUsernameComponent,
      },
      {
        path: 'step-2',
        component: RegisterEmailComponent,
      },
      {
        path: 'step-3',
        component: RegisterPasswordComponent,
      },
      {
        path: 'step-4',
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
