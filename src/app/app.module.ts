import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { auth } from 'firebase';
import { auth as authui } from 'firebaseui';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormModule } from './modules/form/form.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';

const firebaseUiAuthConfig: authui.Config = {
  signInOptions: [
    {
      provider: auth.GoogleAuthProvider.PROVIDER_ID,
      clientId: environment.googleClientId,
    },
    {
      scopes: ['public_profile', 'email'],
      customParameters: {
        auth_type: 'reauthenticate',
      },
      provider: auth.FacebookAuthProvider.PROVIDER_ID,
    },
    {
      requireDisplayName: false,
      provider: auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  credentialHelper: authui.CredentialHelper.ACCOUNT_CHOOSER_COM,
  signInFlow: 'popup',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormModule,
    LoginModule,
    HomeModule,
  ],
  providers: [
    {
      provide: SETTINGS,
      useValue: environment.production
        ? undefined
        : {
            host: 'localhost:8001',
            ssl: false,
          },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
