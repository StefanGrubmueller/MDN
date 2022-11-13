import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  public getUserStatus(): boolean {
    return localStorage.getItem('user') != null;
  }

  public async signIn(email: string, password: string): Promise<any> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => localStorage.setItem('user', JSON.stringify(res.user)))
      .catch((error) => console.log('error', error));
  }

  public async signUp(email: string, password: string): Promise<any> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => localStorage.setItem('user', JSON.stringify(res.user)))
      .catch((error) => console.log('error', error));
  }

  public logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user')
  }
}
