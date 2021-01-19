import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminChild } from '../../admin.component';
import { SettingsViewData } from './settings-view.data';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
})
export class SettingsViewComponent implements OnInit, AdminChild {
  title: Subject<string> = new BehaviorSubject<string>('Ustawienia');
  name = 'settings';

  newPupilNotificationsFormGroup = new FormGroup({});
  newTutorNotificationsFormGroup = new FormGroup({});

  data: Observable<SettingsViewData>;

  constructor(public adminService: AdminService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.data = this.activatedRoute.data.pipe(map((data) => data.data as SettingsViewData));
  }

  ngOnInit(): void {
    this.data.subscribe((data) => {
      console.log(data.newPupilNotifications);
      this.newPupilNotificationsFormGroup = this.formBuilder.group(data.newPupilNotifications);
      this.newPupilNotificationsFormGroup.valueChanges.subscribe(this.adminService.updateNewPupilNotifications.bind(this.adminService));

      this.newTutorNotificationsFormGroup = this.formBuilder.group(data.newTutorNotifications);
      this.newTutorNotificationsFormGroup.valueChanges.subscribe(this.adminService.updateNewTutorNotifications.bind(this.adminService));
    });
  }
}
