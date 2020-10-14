import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  redirectSub: Subscription;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.authState.subscribe((response) => {
      console.log('[authStateChange]', response);
    });
  }

  ngOnInit() {
    this.redirectSub = this.angularFireAuth.authState.pipe(first((user) => !!user)).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('[successCallback]', signInSuccessData);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log('[errorCallback]', errorData);
  }

  uiShownCallback() {
    console.log('[uiShownCallback]');
  }
}
