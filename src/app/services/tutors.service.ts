import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tutor } from '../models/tutor';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  tutorsList$: Observable<Tutor[]> = this.firestore
    .collection('tutors')
    .valueChanges()
    .pipe(map((snapshot) => snapshot as Tutor[]));

  constructor(private firestore: AngularFirestore) {}

  createTutor(tutor: Tutor): Promise<void> {
    return this.firestore.collection('tutors').doc(tutor.email).set(tutor);
  }
}
