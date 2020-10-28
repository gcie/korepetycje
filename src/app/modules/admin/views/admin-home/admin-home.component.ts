import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';
import { TutorsService } from 'src/app/core/services/tutors.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  user: User;

  constructor(private angularFireAuth: AngularFireAuth, public auth: AuthService, public tutors: TutorsService) {
    this.getUser();
  }

  async getUser() {
    this.user = await this.angularFireAuth.currentUser;
    console.log(this.user);
  }
}
