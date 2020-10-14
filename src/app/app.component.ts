import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'korepetycje';

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  logout() {
    this.auth.signOut();
  }
}
