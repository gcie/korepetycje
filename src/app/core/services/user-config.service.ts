import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserConfig } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserConfigService {
  data = new BehaviorSubject<UserConfig>(null);
  resolved = new BehaviorSubject<boolean>(false);

  private dataSub: Subscription;

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    this.auth.user.subscribe((user) => {
      if (!user) return;
      this.dataSub?.unsubscribe();

      this.dataSub = this.firestore
        .collection(`users/${this.auth.uid}/data`)
        .doc('metadata')
        .valueChanges()
        .subscribe((data) => {
          if (!data) this.createEmptyData();
          this.data.next(data);
          if (!this.resolved.value) this.resolved.next(true);
        });
    });
  }

  createEmptyData() {
    this.firestore.collection(`users/${this.auth.uid}/data`).doc('metadata').set({});
  }

  set(name: string, value: any) {
    this.firestore
      .collection(`users/${this.auth.uid}/data`)
      .doc('metadata')
      .update({ [name]: value });
  }

  get(name: string) {
    return this.data.value[name];
  }

  set tutorsListDisplayedColumns(value: string[]) {
    this.firestore.collection(`users/${this.auth.uid}/data`).doc('metadata').update({ tutorsListDisplayedColumns: value });
  }
}
