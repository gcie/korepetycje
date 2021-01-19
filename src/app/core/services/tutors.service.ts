import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tutor } from '../models/tutor';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  tutorsList$: Observable<Tutor[]>;

  constructor(private firestore: AngularFirestore) {
    this.tutorsList$ = this.firestore
      .collection('tutors')
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Tutor[]));
  }

  createTutor(tutor: Tutor): Promise<DocumentReference> {
    return this.firestore.collection('tutors').add(tutor);
    // return this.firestore.collection('tutors').doc(tutor.email).set(tutor);
  }

  getTutor(id: string): Observable<Tutor> {
    return this.firestore
      .collection('tutors')
      .doc(id)
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Tutor));
  }

  updateTutor(id: string, tutor: Partial<Tutor>) {
    return this.firestore.collection('tutors').doc(id).update(tutor);
  }
}
