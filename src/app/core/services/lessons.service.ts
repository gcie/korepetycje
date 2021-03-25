import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference, QueryFn } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lessons } from '../models/lessons';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  data: BehaviorSubject<Lessons[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection('lessons')
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Lessons[]))
      .subscribe(this.data.next.bind(this.data));
  }

  createLessons(lessons: Lessons): Promise<DocumentReference> {
    return this.firestore.collection('lessons').add(lessons);
  }

  getLessonsByTutorId(tutorId: string) {
    return this.firestore
      .collection('lessons', (ref) => ref.where('tutorId', '==', tutorId))
      .valueChanges({ idField: '_id' })
      .pipe(map((doc) => doc as Lessons[]));
  }

  getLessonsByPupilId(pupilId: string) {
    return this.firestore
      .collection('lessons', (ref) => ref.where('pupilId', '==', pupilId))
      .valueChanges({ idField: '_id' })
      .pipe(map((doc) => doc as Lessons[]));
  }

  getLessons(id: string, queryFn?: QueryFn<DocumentData>): Observable<Lessons> {
    return this.firestore
      .collection('lessons', queryFn)
      .doc(id)
      .valueChanges({ idField: '_id' })
      .pipe(map((snapshot) => snapshot as Lessons));
  }

  updateLessons(id: string, lessons: Partial<Lessons>) {
    return this.firestore.collection('lessons').doc(id).update(lessons);
  }

  deleteLessons(id: string) {
    return this.firestore.collection('lessons').doc(id).delete();
  }
}
