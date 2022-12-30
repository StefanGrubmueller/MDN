import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {User} from "../types/user";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  allUsers: Array<User> = [];

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore) {
    this.userCollection = this.getUserCollection();
    this.downloadAllUsers();
  }

  public getUserStatus(): boolean {
    return localStorage.getItem('user') != null;
  }

  public geAllUsers(): Array<User> {
    return this.allUsers;
  }

  public uploadUserInformation(user: User): void {
    this.db.collection('users').doc(user.id).set(user);
  }

  public getUser(userId: string): User {
    // @ts-ignore
    return this.allUsers.find((user: User) => user.id as User === userId);
  }

  private downloadAllUsers(): void {
    this.userCollection.ref.get().then((elem) => elem.docs.map(user => this.allUsers.push(user.data())));
  }

  private getUserCollection(): AngularFirestoreCollection<User> {
    return this.db.collection('users');
  }
}
