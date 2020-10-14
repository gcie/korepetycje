import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pupil } from '../models/pupil';

@Injectable({
  providedIn: 'root',
})
export class PupilsService {
  pupilsList$: Observable<Pupil[]> = this.firestore
    .collection('pupils')
    .valueChanges()
    .pipe(map((snapshot) => snapshot as Pupil[]));

  constructor(private firestore: AngularFirestore) {}

  createPupil(pupil: Pupil): Promise<void> {
    return this.firestore.collection('pupils').doc(pupil.contactEmail).set(pupil);
  }
}
