import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

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
        password: ['' , [Validators.required]],
      },
    )
  }


  public async login() {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';
    await this.authService.signIn(email, password);
    console.log('buf', localStorage.getItem('user'));
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

}
