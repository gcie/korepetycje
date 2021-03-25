import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tutor } from '../models/tutor';
import { LessonsService } from './lessons.service';
import { PupilsService } from './pupils.service';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  data: BehaviorSubject<Tutor[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore, private lessonsService: LessonsService, private pupilsService: PupilsService) {
    this.firestore
      .collection('tutors')
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Tutor[]))
      .subscribe(this.data.next.bind(this.data));
  }

  createTutor(tutor: Tutor): Promise<DocumentReference> {
    return this.firestore.collection('tutors').add(tutor);
  }

  getTutorRef(id: string): Observable<Tutor> {
    return this.firestore
      .collection('tutors')
      .doc(id)
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Tutor));
  }

  updateTutor(id: string, tutor: Partial<Tutor>) {
    return this.firestore.collection('tutors').doc(id).update(tutor);
  }

  deleteTutor(id: string) {
    return this.firestore.collection('tutors').doc(id).delete();
  }
}
