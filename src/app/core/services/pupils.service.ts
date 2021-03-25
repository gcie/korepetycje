import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pupil } from '../models/pupil';

@Injectable({
  providedIn: 'root',
})
export class PupilsService {
  data: BehaviorSubject<Pupil[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection('pupils')
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Pupil[]))
      .subscribe(this.data.next.bind(this.data));
  }

  createPupil(pupil: Pupil): Promise<DocumentReference> {
    return this.firestore.collection('pupils').add(pupil);
  }

  getPupilRef(id: string): Observable<Pupil> {
    return this.firestore
      .collection('pupils')
      .doc(id)
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Pupil));
  }

  getPupil(id: string): Observable<Pupil> {
    return this.firestore
      .collection('pupils')
      .doc(id)
      .get()
      .pipe(map((doc) => doc.data() as Pupil));
  }

  updatePupil(id: string, pupil: Partial<Pupil>) {
    return this.firestore.collection('pupils').doc(id).update(pupil);
  }

  deletePupil(id: string) {
    return this.firestore.collection('pupils').doc(id).delete();
  }
}
