import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { firstNonNull } from '../models/operators';
import { Tutor } from '../models/tutor';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  get ready() {
    return this._ready.pipe(firstNonNull());
  }
  private _ready = new BehaviorSubject(false);

  data: BehaviorSubject<Tutor[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore, private logger: LoggerService) {
    this.firestore
      .collection('tutors')
      .valueChanges({ idField: '_id' })
      .pipe(
        map((snapshot) => snapshot as Tutor[]),
        tap((data) => {
          this.logger.info('[TutorsService] snapshot update:', data);
          this.data.next(data);
        })
      )
      .subscribe(() => this._ready.next(true));
  }

  createTutor(tutor: Tutor): Promise<DocumentReference> {
    return this.firestore.collection('tutors').add(tutor);
  }

  getTutor(id: string): Tutor {
    if (!this._ready.value) {
      this.logger.warn('[TutorsService] tried to get tutor synchronously before service loaded data');
      return;
    } else return this.data.value.filter((tutor) => tutor._id == id)[0];
  }

  getTutor$(id: string): Observable<Tutor> {
    return this.data.pipe(map((tutors) => tutors.filter((tutor) => tutor._id == id)[0]));
  }

  updateTutor(id: string, tutor: Partial<Tutor>) {
    return this.firestore.collection('tutors').doc(id).update(tutor);
  }

  deleteTutor(id: string) {
    return this.firestore.collection('tutors').doc(id).delete();
  }
}
