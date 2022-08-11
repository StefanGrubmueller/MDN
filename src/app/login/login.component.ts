import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";

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

  @Output()
  loginSuccess = new EventEmitter<string>;

  loggedIn: any = undefined;
  // @ts-ignore
  loginFailErrorMsg: string;
  // @ts-ignore
  loginForm: FormGroup;
  // @ts-ignore
  logInUser: loginUserForm;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private angularFireAuth: AngularFireAuth, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.loggedIn = null;
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['' , [Validators.required]],
      },
    )

  }

  close() {
    this.dialogRef.close();
  }

  logIn() {
    // console.log('email: ', this.loginForm.get('email')?.value);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .then(() => {
        this.loggedIn = true;
        this.loginSuccess.emit(this.loginForm.controls['email'].value);
      })
      .catch((error) => {
        this.loggedIn = false;
        this.loginFailErrorMsg = error.message;
      });

  }



  getEmailErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['password'].hasError('email') ? 'Not a valid password' : '';
  }

  isUserDataValid(): boolean {
    return !(this.loginForm.controls['password'].valid && this.loginForm.controls['email'].valid);
  }

}
