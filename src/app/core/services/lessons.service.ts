import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { Lessons } from '../models/lessons';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  get ready() {
    return this._ready.pipe(
      filter((x) => x),
      take(1)
    );
  }
  private _ready = new BehaviorSubject(false);

  data: BehaviorSubject<Lessons[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore, private logger: LoggerService) {
    this.firestore
      .collection('lessons')
      .valueChanges({ idField: '_id' })
      .pipe(
        map((snapshot) => snapshot as Lessons[]),
        tap(() => this._ready.next(true)),
        tap((snapshot) => this.logger.info('[LessonsService] snapshot update:', snapshot))
      )
      .subscribe(this.data.next.bind(this.data));
  }

  createLessons(lessons: Lessons): Promise<DocumentReference> {
    return this.firestore.collection('lessons').add(lessons);
  }

  getLessonsByTutorId(tutorId: string): Lessons[] {
    if (!this._ready.value) {
      this.logger.warn('[LessonsService] tried to get lessons synchronously before service loaded data');
      return;
    } else return this.data.value.filter((l) => l.tutorId === tutorId);
  }

  getLessonsByTutorId$(tutorId: string): Observable<Lessons[]> {
    return this.data.pipe(map((lessons) => lessons.filter((l) => l.tutorId === tutorId)));
  }

  getLessonsByPupilId(pupilId: string): Lessons[] {
    if (!this._ready.value) {
      this.logger.warn('[LessonsService] tried to get lessons synchronously before service loaded data');
      return;
    } else return this.data.value.filter((l) => l.pupilId === pupilId);
  }

  getLessonsByPupilId$(pupilId: string): Observable<Lessons[]> {
    return this.data.pipe(map((lessons) => lessons.filter((l) => l.pupilId === pupilId)));
  }

  updateLessons(id: string, lessons: Partial<Lessons>) {
    return this.firestore.collection('lessons').doc(id).update(lessons);
  }

  deleteLessons(id: string) {
    return this.firestore.collection('lessons').doc(id).delete();
  }
}
