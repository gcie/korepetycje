import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewPupilNotifications } from '../models/new-pupil-notifications';
import { NewTutorNotifications } from '../models/new-tutor-notifications';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  ADMIN_COLLECTION_STR = 'admin';

  NEW_PUPIL_NOTIFICATIONS_DOC_STR = 'newPupilNotifications';
  NEW_TUTOR_NOTIFICATIONS_DOC_STR = 'newTutorNotifications';

  adminCollection: AngularFirestoreCollection;

  newPupilNotificationsDoc: AngularFirestoreDocument;
  newTutorNotificationsDoc: AngularFirestoreDocument;

  newPupilNotifications$: Observable<NewPupilNotifications>;
  newTutorNotifications$: Observable<NewTutorNotifications>;

  constructor(private firestore: AngularFirestore) {
    // initialize collection
    this.adminCollection = this.firestore.collection(this.ADMIN_COLLECTION_STR);
    // initialize documents
    this.newPupilNotificationsDoc = this.adminCollection.doc(this.NEW_PUPIL_NOTIFICATIONS_DOC_STR);
    this.newTutorNotificationsDoc = this.adminCollection.doc(this.NEW_TUTOR_NOTIFICATIONS_DOC_STR);
    // initialize observables
    this.newPupilNotifications$ = this.newPupilNotificationsDoc.valueChanges().pipe(map((snapsshot) => snapsshot as NewPupilNotifications));
    this.newTutorNotifications$ = this.newTutorNotificationsDoc.valueChanges().pipe(map((snapshot) => snapshot as NewTutorNotifications));
  }

  getNewPupilNotifications() {
    return this.newPupilNotificationsDoc.get().pipe(map((doc) => doc.data() as NewPupilNotifications));
  }

  getNewTutorNotifications() {
    return this.newTutorNotificationsDoc.get().pipe(map((doc) => doc.data() as NewTutorNotifications));
  }

  updateNewPupilNotifications(doc: Partial<NewPupilNotifications>) {
    return this.newPupilNotificationsDoc.update(doc);
  }

  updateNewTutorNotifications(doc: Partial<NewTutorNotifications>) {
    return this.newTutorNotificationsDoc.update(doc);
  }
}
