import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tutor } from 'src/app/core/models/tutor';
import { UserConfig } from 'src/app/core/models/user';
import { TutorsService } from 'src/app/core/services/tutors.service';
import { UserConfigService } from 'src/app/core/services/user-config.service';
import { AdminChild } from '../../admin.component';

@Component({
  selector: 'app-tutors-list-view',
  templateUrl: './tutors-list-view.component.html',
  styleUrls: ['./tutors-list-view.component.scss'],
})
export class TutorsListViewComponent implements OnInit, AdminChild {
  title: Observable<string> = new BehaviorSubject<string>('Korepetytorzy');
  name = 'tutorsList';

  tutorsData = new MatTableDataSource<Tutor>();
  tutorsDisplayedColumns = new FormControl(['name', 'email', 'phone', 'teaches', 'lessonsMode', 'pupil']);
  tutorsDisplayedColumnsList = ['name', 'email', 'phone', 'teaches', 'lessonsMode', 'pupil'];
  tutors: Tutor[];

  constructor(public tutorsService: TutorsService, private router: Router, public user: UserConfigService, public route: ActivatedRoute) {
    this.route.data.subscribe((data) => this.init(data.config));
  }

  init(config: UserConfig) {
    if (config.tutorsListDisplayedColumns) this.tutorsDisplayedColumns.setValue(config.tutorsListDisplayedColumns);
  }

  ngOnInit() {
    this.tutorsService.tutorsList$.subscribe((tutors) => (this.tutorsData.data = this.tutors = tutors));
    this.tutorsDisplayedColumns.valueChanges.subscribe((value) => (this.user.tutorsListDisplayedColumns = value));
  }

  edit(tutor: Tutor) {
    this.router.navigateByUrl(`/admin/tutor/${tutor._id}`);
  }

  columnName(desc: string) {
    switch (desc) {
      case 'name':
        return 'Imię i nazwisko';
      case 'email':
        return 'Email';
      case 'phone':
        return 'Nr telefonu';
      case 'teaches':
        return 'Przedmioty';
      case 'lessonsMode':
        return 'Preferowany tryb';
      case 'pupil':
        return 'Uczeń?';
    }
  }
}
