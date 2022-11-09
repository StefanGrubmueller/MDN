import {Component} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'MDNetwork';
  logged: boolean = true;
  email: string = "";

  constructor(private db: AngularFirestore) {
  }

  loggedIn(email: string) {
    this.email = email;
    this.logged = true;
  }
}
