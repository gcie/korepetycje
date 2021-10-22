import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { firstNonNull } from '../models/operators';
import { Pupil } from '../models/pupil';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class PupilsService {
  get ready() {
    return this._ready.pipe(firstNonNull());
  }
  private _ready = new BehaviorSubject(false);

  data: BehaviorSubject<Pupil[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore, private logger: LoggerService) {
    this.firestore
      .collection('pupils')
      .valueChanges({ idField: '_id' })
      .pipe(
        map((snapshot) => snapshot as Pupil[]),
        tap((data) => {
          this.logger.info('[PupilsService] snapshot update:', data);
          this.data.next(data);
        })
      )
      .subscribe(() => this._ready.next(true));
  }

  createPupil(pupil: Pupil): Promise<DocumentReference> {
    return this.firestore.collection('pupils').add(pupil);
  }

  getPupil$(id: string): Observable<Pupil> {
    return this.data.pipe(map((pupils) => pupils.filter((pupil) => pupil._id == id)[0]));
  }

  getPupil(id: string): Pupil {
    if (!this._ready.value) {
      this.logger.warn('[PupilsService] tried to get pupil synchronously before service loaded data');
      return;
    } else return this.data.value.filter((pupil) => pupil._id == id)[0];
  }

  updatePupil(id: string, pupil: Partial<Pupil>) {
    return this.firestore.collection('pupils').doc(id).update(pupil);
  }

  deletePupil(id: string) {
    return this.firestore.collection('pupils').doc(id).delete();
  }
}
