import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { LibraryComponent } from './library/library.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserSearchFilterPipe } from './search/pipes/user-search-filter.pipe';
import { GetSearchTextPipe } from './search/pipes/get-search-text.pipe';
import { MovieSearchFilterPipe } from './search/pipes/movie-search-filter.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TabMenuModule } from 'primeng/tabmenu';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { SettingsComponent } from './settings/settings.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { StepsModule } from 'primeng/steps';
import { RegisterUsernameComponent } from './register-username/register-username.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterFinishedComponent } from './register-finished/register-finished.component';
import { SkeletonMainPageComponent } from './skeltons/skeleton-main-page/skeleton-main-page.component';
import {SkeletonModule} from "primeng/skeleton";
import { NavigationComponent } from './navigation/navigation.component';
import {SidebarModule} from "primeng/sidebar";
import { PlaylistsComponent } from './playlists/playlists.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import {DialogModule} from "primeng/dialog";
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    FooterComponent,
    MovieInfoComponent,
    SearchComponent,
    LibraryComponent,
    AddMovieComponent,
    TopBarComponent,
    UserSearchFilterPipe,
    GetSearchTextPipe,
    MovieSearchFilterPipe,
    UserProfileComponent,
    SettingsComponent,
    CreateProfileComponent,
    RegisterUsernameComponent,
    RegisterEmailComponent,
    RegisterPasswordComponent,
    ResetPasswordComponent,
    RegisterFinishedComponent,
    SkeletonMainPageComponent,
    NavigationComponent,
    PlaylistsComponent,
    MovieListComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    PasswordModule,
    TabMenuModule,
    DividerModule,
    ListboxModule,
    TableModule,
    ToastModule,
    ImageModule,
    MenuModule,
    StepsModule,
    SkeletonModule,
    SidebarModule,
    DialogModule,
    CardModule
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
