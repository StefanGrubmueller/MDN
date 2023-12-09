import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../types/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userCollection: AngularFirestoreCollection<User>;
  private _allUsers: Array<User> = [];

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {
    this._userCollection = this.getUserCollection();
    this.downloadAllUsers();
  }

  public getUserStatus(): boolean {
    return localStorage.getItem('user') != null;
  }

  public geAllUsers(): Array<User> {
    return this._allUsers;
  }

  public uploadUserInformation(user: User): void {
    this.db.collection('users').doc(user.id).set(user);
  }

  public getUser(userId: string): User {
    // @ts-ignore
    return this._allUsers.find((user: User) => (user.id as User) === userId);
  }

  private downloadAllUsers(): void {
    this._userCollection.ref
      .get()
      .then((elem) =>
        elem.docs.map((user) => this._allUsers.push(user.data())),
      );
  }

  private getUserCollection(): AngularFirestoreCollection<User> {
    return this.db.collection('users');
  }
}
