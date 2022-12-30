import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

type loginUserForm = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;

  hide = true;

  loginForm: FormGroup;


  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
    )
  }


  public async login() {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';
    await this.authService.signIn(email, password);
    if (localStorage.getItem('user') != null) {
      this.router.navigate([''])
    } else {
      this.loggedIn = false;
    }
  }

  isUserDataValid(): boolean {
    return !(this.loginForm.controls['password'].valid && this.loginForm.controls['email'].valid);
  }

  public routeToRegister(): void {
    this.router.navigate(['register']);
  }

  public onEnter(event: any) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

}
