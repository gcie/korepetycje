import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { PupilsService } from 'src/app/core/services/pupils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pupils: PupilsService, private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  logout() {
    this.auth.signOut();
  }

  test() {
    // this.pupils.pupilsList$.subscribe(console.log);
    this.auth.user.pipe(take(1)).subscribe(console.warn);
    // this.auth.authState.subscribe(console.log);
  }
}
