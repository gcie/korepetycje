import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { BehaviorSubject, Subject } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { NewPupilNotifications } from 'src/app/core/models/new-pupil-notifications';
import { NewTutorNotifications } from 'src/app/core/models/new-tutor-notifications';
import { AdminService } from 'src/app/core/services/admin.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AdminChild } from '../../admin.component';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
})
export class SettingsViewComponent implements AdminChild, CanComponentDeactivate {
  title: Subject<string> = new BehaviorSubject<string>('Ustawienia');
  name = 'settings';

  newPupilNotificationsFormGroup = new FormGroup({});
  newTutorNotificationsFormGroup = new FormGroup({});

  dirty = false;

  newPupilNotifications: NewPupilNotifications;
  newTutorNotifications: NewTutorNotifications;

  constructor(public adminService: AdminService, public dialogService: DialogService, private formBuilder: FormBuilder) {
    this.newPupilNotifications = this.adminService.getNewPupilNotifications();
    this.newTutorNotifications = this.adminService.getNewTutorNotifications();

    this.adminService.newPupilNotifications.subscribe((newPupilNotifications) => {
      this.newPupilNotifications = newPupilNotifications;
      this.newPupilNotificationsFormGroup = this.formBuilder.group(newPupilNotifications);
      this.newPupilNotificationsFormGroup.valueChanges.subscribe(this.updateDirtiness.bind(this));
      this.updateDirtiness();
    });

    this.adminService.newTutorNotifications.subscribe((newTutorNotifications) => {
      this.newTutorNotifications = newTutorNotifications;
      this.newTutorNotificationsFormGroup = this.formBuilder.group(newTutorNotifications);
      this.newTutorNotificationsFormGroup.valueChanges.subscribe(this.updateDirtiness.bind(this));
      this.updateDirtiness();
    });
  }

  canDeactivate() {
    if (!this.dirty) return true;
    return this.dialogService.windowConfirm('Odrzucić zmiany?');
  }

  updateDirtiness() {
    this.dirty =
      !isEqual(this.newPupilNotificationsFormGroup.value, this.newPupilNotifications) ||
      !isEqual(this.newTutorNotificationsFormGroup.value, this.newTutorNotifications);
  }

  save() {
    if (this.dirty) {
      this.adminService.updateNewPupilNotifications(this.newPupilNotificationsFormGroup.value);
      this.adminService.updateNewTutorNotifications(this.newTutorNotificationsFormGroup.value);
    }
  }
}
