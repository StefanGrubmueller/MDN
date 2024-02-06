import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private manageMovieService: ManageMoviesOfDbService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [],
    });
  }

  routeToRegister(): void {
    this.router.navigate(['register/step-1']);
  }

  routeToForgetPassword() {
    this.router.navigate(['reset-password']);
  }

  async login() {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    this.handleRemember();

    await this.authService
      .signIn(email, password)
      .catch((error: string) => this.setErrorMessage(error));
    if (localStorage.getItem('user') != null) {
      this.router.navigate(['']);
    } else {
      this.loggedIn = false;
    }
  }

  private handleRemember() {
    if (this.loginForm.get('rememberMe')?.value === true) {
      localStorage.setItem('rememberUser', 'true');
    } else {
      localStorage.removeItem('rememberUser');
    }
  }

  private setErrorMessage(error: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 10000,
    });
  }
}
