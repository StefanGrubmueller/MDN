import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [MessageService],
})
export class ResetPasswordComponent {
  email: string;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  sendResetEmail() {
    this.authService.resetPassword(this.email);
    this.setResetSuccessMessage();
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  private setResetSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'An email with a link has been sent to reset your password.',
      life: 10000,
    });
  }
}
