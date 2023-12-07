import { Component } from '@angular/core';
import { RegisterService } from '../shared/services/register.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
  providers: [MessageService],
})
export class RegisterPasswordComponent {
  password: string;
  confirmedPassword: string;

  constructor(
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  registerAndRouteToStep4() {
    this.registerService.setPassword(this.password);
    this.authService
      .signUp(this.registerService.getUser())
      .then(() => {
        this.router.navigate(['register/step-4']);
      })
      .catch((error) => this.setResetErrorMessage(error));
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  private setResetErrorMessage(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 10000,
    });
  }
}
