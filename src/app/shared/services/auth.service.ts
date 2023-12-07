import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseAuthUser } from '../types/User';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';
import { ManageMoviesOfDbService } from './manage-movies-of-db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _subject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private manageMovieService: ManageMoviesOfDbService,
  ) {}

  public async signIn(email: string, password: string): Promise<any> {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setUserToken(res);
      });
  }

  public signUp(user: FirebaseAuthUser): Promise<any> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        //this.setUserToken(res);
        //this.userService.uploadUserInformation(user);
      });
  }

  public getFirebaseAuthState(): Observable<any> {
    return this.firebaseAuth.authState;
  }

  public getUserDetails(): Observable<any> {
    return this.firebaseAuth.user;
  }

  public resetPassword(email: string): Promise<any> {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

  private setUserToken(res: any) {
    this._subject.next(true);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  public logout(): void {
    this.firebaseAuth.signOut();
    this.manageMovieService.clearAllMovies();
    localStorage.removeItem('user');
    this._subject.next(false);
  }
}
