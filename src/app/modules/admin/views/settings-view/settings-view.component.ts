import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdminChild } from '../../admin.component';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
})
export class SettingsViewComponent implements OnInit, AdminChild {
  title: Subject<string> = new BehaviorSubject<string>('Ustawienia');
  name = 'settings';

  settingsForm = new FormGroup({});

  constructor() {}

  ngOnInit(): void {}
}
