import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { MainPageComponent } from './main-page/main-page.component';
import {MatButtonModule} from "@angular/material/button";
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    FooterComponent
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
    MatIconModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
    LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
