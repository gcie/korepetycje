import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pupil } from '../models/pupil';

@Injectable({
  providedIn: 'root',
})
export class PupilsService {
  pupilsList$: Observable<Pupil[]> = this.firestore
    .collection('pupils')
    .valueChanges({ idField: '_id' })
    .pipe(map((snapshot) => snapshot as Pupil[]));

  constructor(private firestore: AngularFirestore) {}

  createPupil(pupil: Pupil): Promise<DocumentReference> {
    return this.firestore.collection('pupils').add(pupil);
  }
}
