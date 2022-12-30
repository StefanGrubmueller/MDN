import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/types/user";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hidePw1 = true;
  hidePw2 = true;

  registerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        username: ['', [Validators.required]],
      },
    )
  }

  public async register() {
    const newUser: User = this.createNewUser();

    await this.authService.signUp(newUser);
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

  private createNewUser(): User {

    return {
      id: uuidv4(),
      email: this.registerForm.get('email')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? '',
      userName: this.registerForm.get('username')?.value ?? ''
    }
  }

}
