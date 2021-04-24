import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { Pupil } from '../models/pupil';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class PupilsService {
  get ready() {
    return this._ready.pipe(
      filter((x) => x),
      take(1)
    );
  }
  private _ready = new BehaviorSubject(false);

  data: BehaviorSubject<Pupil[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore, private logger: LoggerService) {
    this.firestore
      .collection('pupils')
      .valueChanges({ idField: '_id' })
      .pipe(
        map((snapshot) => snapshot as Pupil[]),
        tap(() => this._ready.next(true)),
        tap((snapshot) => this.logger.info('[PupilsService] snapshot update:', snapshot))
      )
      .subscribe(this.data.next.bind(this.data));
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
