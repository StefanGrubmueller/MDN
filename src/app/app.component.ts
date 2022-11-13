import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'MDNetwork';
  logged: boolean = false;
  email: string = "";

  constructor(private authSerice: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.logged = this.authSerice.getUserStatus();
    if(!this.logged) {
      this.router.navigate(['login']);
    }
    console.log('log2', this.logged)
  }
}
