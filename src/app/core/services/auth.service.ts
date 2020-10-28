import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User | undefined>;

  constructor(private angularFireAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.user = this.angularFireAuth.authState.pipe(
      mergeMap((authState) => {
        if (!authState) {
          return throwError('AuthState is none');
        }
        return forkJoin({ doc: this.firestore.collection('users').doc(authState.uid).get(), authState: of(authState) });
      }),
      mergeMap(({ doc, authState }) => {
        if (!doc.data()) {
          const user: User = this.createNewUser(authState);
          return this.firestore
            .collection('users')
            .doc(authState.uid)
            .set(user)
            .then(() => user);
        } else {
          return of(doc.data() as User);
        }
      }),
      map((user) => {
        console.log(user);
        return user;
      }),
      catchError(() => {
        return of(undefined);
      })
    );
  }

  async logout() {
    await this.angularFireAuth.signOut();
    await this.router.navigateByUrl('/');
  }

  createNewUser(authState: firebase.User): User {
    return {
      email: authState.email,
      permissions: {
        user: true,
        manager: false,
      },
    };
  }
}
