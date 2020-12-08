import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TutorsService } from 'src/app/core/services/tutors.service';

export interface AdminChild {
  title: Observable<string>;
  name: string;
  canGoBack?: boolean;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  user: User;
  title: Observable<string> = new BehaviorSubject<string>('Konsola podprzęsłowego korepetycji MOSTowych');

  navList = [
    { label: 'Ustawienia', location: '/admin', componentName: 'home', isActive: true },
    { label: 'Korepetytorzy', location: '/admin/tutors', componentName: 'tutorsList', isActive: false },
  ];

  constructor(private angularFireAuth: AngularFireAuth, public auth: AuthService, public tutors: TutorsService) {
    this.getUser();
  }

  async getUser() {
    this.user = await this.angularFireAuth.currentUser;
    console.log(this.user);
  }

  onActivate(componentReference: AdminChild) {
    console.log(componentReference);
    this.title = componentReference.title;
    this.navList.forEach((link) => {
      link.isActive = componentReference.name === link.componentName;
    });
  }
}
