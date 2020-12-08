import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User | undefined>;
  uid$ = new BehaviorSubject<string>(null);

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.user = this.fireAuth.authState.pipe(
      mergeMap((authState) => {
        if (!authState) {
          return throwError('AuthState is none');
        }
        this.uid$.next(authState.uid);
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
          return of(Object.assign({}, doc.data(), { uid: authState.uid }) as User);
        }
      }),
      map((user) => {
        return user;
      }),
      catchError(() => {
        return of(undefined);
      })
    );
  }

  async logout() {
    await this.fireAuth.signOut();
    await this.router.navigateByUrl('/');
  }

  createNewUser(authState: firebase.User): User {
    return {
      uid: authState.uid,
      email: authState.email,
      permissions: {
        user: true,
        manager: false,
      },
    };
  }

  get uid() {
    return this.uid$.value;
  }
}
