import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NewPupilNotifications } from '../models/new-pupil-notifications';
import { NewTutorNotifications } from '../models/new-tutor-notifications';
import { all, firstNonNull } from '../models/operators';
import { LoggerService } from './logger.service';

export class AdminData {
  newPupilNotifications: NewPupilNotifications;
  newTutorNotifications: NewTutorNotifications;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  get ready() {
    return all(this._npnready, this._ntnready).pipe(firstNonNull());
  }
  private _npnready = new BehaviorSubject(false);
  private _ntnready = new BehaviorSubject(false);

  newPupilNotifications: BehaviorSubject<NewPupilNotifications> = new BehaviorSubject(null);
  newTutorNotifications: BehaviorSubject<NewTutorNotifications> = new BehaviorSubject(null);

  private readonly ADMIN_COLLECTION_STR = 'admin';

  private readonly NEW_PUPIL_NOTIFICATIONS_DOC_STR = 'newPupilNotifications';
  private readonly NEW_TUTOR_NOTIFICATIONS_DOC_STR = 'newTutorNotifications';

  private adminCollection: AngularFirestoreCollection;

  private newPupilNotificationsDoc: AngularFirestoreDocument;
  private newTutorNotificationsDoc: AngularFirestoreDocument;

  constructor(private firestore: AngularFirestore, private logger: LoggerService) {
    // initialize collection
    this.adminCollection = this.firestore.collection(this.ADMIN_COLLECTION_STR);
    // initialize documents
    this.newPupilNotificationsDoc = this.adminCollection.doc(this.NEW_PUPIL_NOTIFICATIONS_DOC_STR);
    this.newTutorNotificationsDoc = this.adminCollection.doc(this.NEW_TUTOR_NOTIFICATIONS_DOC_STR);

    this.newPupilNotificationsDoc
      .valueChanges()
      .pipe(
        map((snapshot) => snapshot as NewPupilNotifications),
        tap((data) => this.newPupilNotifications.next(data))
      )
      .subscribe(() => this._npnready.next(true));

    this.newTutorNotificationsDoc
      .valueChanges()
      .pipe(
        map((snapshot) => snapshot as NewTutorNotifications),
        tap((data) => this.newTutorNotifications.next(data))
      )
      .subscribe(() => this._ntnready.next(true));
  }

  getNewPupilNotifications() {
    if (!this._npnready.value) {
      this.logger.warn('[AdminService] tried to get newPupilNotifications synchronously before service loaded data');
      return;
    } else return this.newPupilNotifications.value;
  }

  getNewTutorNotifications() {
    if (!this._ntnready.value) {
      this.logger.warn('[AdminService] tried to get newTutorNotifications synchronously before service loaded data');
      return;
    } else return this.newTutorNotifications.value;
  }

  getNewPupilNotifications$() {
    return this.newPupilNotifications;
  }

  getNewTutorNotifications$() {
    return this.newTutorNotifications;
  }

  updateNewPupilNotifications(doc: Partial<NewPupilNotifications>) {
    return this.newPupilNotificationsDoc.update(doc);
  }

  updateNewTutorNotifications(doc: Partial<NewTutorNotifications>) {
    return this.newTutorNotificationsDoc.update(doc);
  }
}
