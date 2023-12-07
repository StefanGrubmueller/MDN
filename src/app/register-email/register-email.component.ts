import { Component } from '@angular/core';
import { RegisterService } from '../shared/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss'],
})
export class RegisterEmailComponent {
  email: string;
  confirmedEmail: string;

  constructor(
    private registerService: RegisterService,
    private router: Router,
  ) {}

  saveEmailAndRouteToStep3() {
    this.registerService.setEmail(this.email);
    this.router.navigate(['register/step-3']);
  }
}
