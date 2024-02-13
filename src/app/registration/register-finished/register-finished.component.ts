import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-finished',
  templateUrl: './register-finished.component.html',
  styleUrls: ['./register-finished.component.scss'],
})
export class RegisterFinishedComponent {
  constructor(private router: Router) {}

  routeToLogin() {
    this.router.navigate(['login']);
  }
}
