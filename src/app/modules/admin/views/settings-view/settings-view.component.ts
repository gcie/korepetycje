import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { AdminService } from 'src/app/core/services/admin.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AdminChild } from '../../admin.component';
import { SettingsViewData } from './settings-view.resolver';

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

  initialData: SettingsViewData;

  get dirty() {
    return this.dirtyPupil || this.dirtyTutor;
  }

  dirtyPupil = false;
  dirtyTutor = false;

  constructor(
    public adminService: AdminService,
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.initialData = this.route.snapshot.data.data;
    this.newPupilNotificationsFormGroup = this.formBuilder.group(this.initialData.newPupilNotifications);
    this.newTutorNotificationsFormGroup = this.formBuilder.group(this.initialData.newTutorNotifications);
    this.newPupilNotificationsFormGroup.valueChanges.subscribe(this.updateDirtiness.bind(this, 'pupil'));
    this.newTutorNotificationsFormGroup.valueChanges.subscribe(this.updateDirtiness.bind(this, 'tutor'));
  }

  canDeactivate() {
    if (!this.dirtyPupil && !this.dirtyTutor) return true;
    return this.dialogService.windowConfirm('Odrzucić zmiany?');
  }

  updateDirtiness(form: 'pupil' | 'tutor') {
    switch (form) {
      case 'pupil':
        this.dirtyPupil = Object.keys(this.newPupilNotificationsFormGroup.value).some(
          (k) => this.newPupilNotificationsFormGroup.value[k] !== this.initialData.newPupilNotifications[k]
        );
        break;
      case 'tutor':
        this.dirtyTutor = Object.keys(this.newTutorNotificationsFormGroup.value).some(
          (k) => this.newTutorNotificationsFormGroup.value[k] !== this.initialData.newTutorNotifications[k]
        );
        break;
    }
  }

  save() {
    if (this.dirtyPupil) {
      this.adminService.updateNewPupilNotifications(this.newPupilNotificationsFormGroup.value);
      this.initialData.newPupilNotifications = this.newPupilNotificationsFormGroup.value;
      this.dirtyPupil = false;
    }
    if (this.dirtyTutor) {
      this.adminService.updateNewTutorNotifications(this.newTutorNotificationsFormGroup.value);
      this.initialData.newTutorNotifications = this.newTutorNotificationsFormGroup.value;
      this.dirtyTutor = false;
    }
  }
}
