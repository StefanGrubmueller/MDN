import { Injectable } from '@angular/core';
import { FirebaseAuthUser } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private _user: FirebaseAuthUser = {
    username: '',
    email: '',
    password: '',
  };

  constructor() {}

  setUsername(username: string) {
    this._user.username = username;
  }

  setEmail(email: string) {
    this._user.email = email;
  }

  setPassword(password: string) {
    this._user.password = password;
  }

  getUser() {
    return this._user;
  }
}
