import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  showSpinner = true;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('[LoginComponent]', 'onInit');
    this.route.queryParams
      .pipe(
        mergeMap((params) => {
          this.returnUrl = params['return'] || '/';
          return this.auth.user;
        }),
        map((user) => {
          if (user) this.router.navigateByUrl(this.returnUrl);
        })
      )
      .subscribe();
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('[successCallback]', signInSuccessData);
    this.router.navigateByUrl(this.returnUrl);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log('[errorCallback]', errorData);
  }

  uiShownCallback(data: any) {
    this.showSpinner = false;
    console.log('[uiShownCallback]', data);
  }
}
