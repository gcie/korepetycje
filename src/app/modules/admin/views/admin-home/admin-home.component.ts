import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TutorsService } from 'src/app/core/services/tutors.service';

export interface AdminChild {
  title: Observable<string>;
  canGoBack?: boolean;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  user: User;
  title: Observable<string> = new BehaviorSubject<string>('Konsola podprzęsłowego');

  constructor(
    private angularFireAuth: AngularFireAuth,
    public auth: AuthService,
    public tutors: TutorsService,
    private route: ActivatedRoute
  ) {
    this.getUser();

    this.route.params.subscribe((params) => {
      console.log('[AdminHome] route params: ', params);
    });
    this.route.paramMap.subscribe((params) => {
      console.log('[AdminHome] route paramMap: ', params);
    });
  }

  async getUser() {
    this.user = await this.angularFireAuth.currentUser;
    console.log(this.user);
  }

  onActivate(componentReference: AdminChild) {
    this.title = componentReference.title;
    console.log('[AdminHome] onActivate: ', componentReference);
  }
}
