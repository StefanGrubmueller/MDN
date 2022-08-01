import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MDNetwork';
  logged: boolean = true;
  email: string = "";

  loggedIn(email: string) {
    this.email = email;
    this.logged = true;
  }
}
