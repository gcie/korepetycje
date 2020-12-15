import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  user: User;
  title: Observable<string> = new BehaviorSubject<string>('Konsola podprzęsłowego korepetycji MOSTowych');
  activeComponent: AdminChild;

  navList = [
    { label: 'Ustawienia', location: '/admin/settings', componentName: 'settings', isActive: true },
    { label: 'Korepetytorzy', location: '/admin/tutors', componentName: 'tutorsList', isActive: false },
  ];

  constructor(private angularFireAuth: AngularFireAuth, public auth: AuthService, public tutors: TutorsService, public router: Router) {
    this.getUser();
  }

  async getUser() {
    this.user = await this.angularFireAuth.currentUser;
    console.log(this.user);
  }

  onActivate(componentReference: AdminChild) {
    this.activeComponent = componentReference;
    this.navList.forEach((link) => {
      link.isActive = componentReference.name === link.componentName;
    });
  }
}
