import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { MainPageComponent } from './main-page/main-page.component';
import {MatButtonModule} from "@angular/material/button";
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { MovieInfoComponent } from './movie-info/movie-info.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SearchComponent } from './footer/search/search.component';
import { LibraryComponent } from './footer/library/library.component';
import { AddMovieComponent } from './footer/add-movie/add-movie.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    FooterComponent,
    MovieInfoComponent,
    SearchComponent,
    LibraryComponent,
    AddMovieComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
    LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
