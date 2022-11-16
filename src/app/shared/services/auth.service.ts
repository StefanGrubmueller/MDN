import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {User} from "../types/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection: AngularFirestoreCollection<User>;
  allUsers: Array<User> = [];

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService) {
  }


  public async signIn(email: string, password: string): Promise<any> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => localStorage.setItem('user', JSON.stringify(res.user)))
      .catch((error) => console.log('error', error));
  }

  public async signUp(user: User): Promise<any> {
    await this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userService.uploadUserInformation(user);
      })
      .catch((error) => console.log('error', error));
  }

  public logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user')
  }

}
