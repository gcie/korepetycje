import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { AdminService } from 'src/app/core/services/admin.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AdminChild } from '../../admin.component';
import { SettingsViewData } from './settings-view.data';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
})
export class SettingsViewComponent implements OnInit, AdminChild, CanComponentDeactivate {
  title: Subject<string> = new BehaviorSubject<string>('Ustawienia');
  name = 'settings';

  newPupilNotificationsFormGroup = new FormGroup({});
  newTutorNotificationsFormGroup = new FormGroup({});

  initialData: SettingsViewData;

  data: Observable<SettingsViewData>;

  get dirty() {
    return this.dirtyPupil || this.dirtyTutor;
  }

  dirtyPupil = false;
  dirtyTutor = false;

  constructor(
    public adminService: AdminService,
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.data = this.activatedRoute.data.pipe(map((data) => data.data as SettingsViewData));
  }

  canDeactivate() {
    if (!this.dirtyPupil && !this.dirtyTutor) return true;

    return this.dialogService.confirm('Odrzucić zmiany?');
  }

  ngOnInit(): void {
    this.data.subscribe((data) => {
      this.newPupilNotificationsFormGroup = this.formBuilder.group(data.newPupilNotifications);
      this.newTutorNotificationsFormGroup = this.formBuilder.group(data.newTutorNotifications);
      this.initialData = data;
      this.initForms();
    });
  }

  initForms() {
    this.newPupilNotificationsFormGroup.valueChanges.subscribe(this.checkDirtiness.bind(this, 'pupil'));
    this.newTutorNotificationsFormGroup.valueChanges.subscribe(this.checkDirtiness.bind(this, 'tutor'));
  }

  checkDirtiness(form: 'pupil' | 'tutor') {
    var dirty = false;
    switch (form) {
      case 'pupil':
        Object.keys(this.newPupilNotificationsFormGroup.value).forEach(
          (k) => (dirty ||= this.newPupilNotificationsFormGroup.value[k] !== this.initialData.newPupilNotifications[k])
        );
        this.dirtyPupil = dirty;
        break;
      case 'tutor':
        Object.keys(this.newTutorNotificationsFormGroup.value).forEach(
          (k) => (dirty ||= this.newTutorNotificationsFormGroup.value[k] !== this.initialData.newTutorNotifications[k])
        );
        this.dirtyTutor = dirty;
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
