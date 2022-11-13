import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hidePw1 = true;
  hidePw2 = true;

  registerForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['' , [Validators.required]],
        confirmPassword: ['' , [Validators.required]],
      },
    )
  }

  public async register() {
    const email = this.registerForm.get('email')?.value ?? '';
    const password = this.registerForm.get('password')?.value ?? '';
    await this.authService.signUp(email, password);
    console.log('buf', localStorage.getItem('user'));
    if (localStorage.getItem('user') != null) {
      this.router.navigate(['login'])
    }
  }

  public isUserDataValid(): boolean {
    return !(this.registerForm.controls['password'].valid && this.registerForm.controls['email'].valid &&
      this.registerForm.controls['confirmPassword'].valid &&
      this.registerForm.controls['confirmPassword'].value === this.registerForm.controls['password'].value);
  }

  public routeToLogin(): void {
    this.router.navigate(['login']);
  }

}
