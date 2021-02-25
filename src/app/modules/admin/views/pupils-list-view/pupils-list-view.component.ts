import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pupil } from 'src/app/core/models/pupil';
import { UserConfig } from 'src/app/core/models/user';
import { PupilsService } from 'src/app/core/services/pupils.service';
import { UserConfigService } from 'src/app/core/services/user-config.service';

@Component({
  selector: 'app-pupils-list-view',
  templateUrl: './pupils-list-view.component.html',
  styleUrls: ['./pupils-list-view.component.scss'],
})
export class PupilsListViewComponent implements OnInit {
  title: Observable<string> = new BehaviorSubject<string>('Uczniowie');
  name = 'pupilsList';

  pupilsData = new MatTableDataSource<Pupil>();
  pupilsDisplayedColumns = new FormControl(['submittedDate', 'name', 'email', 'phone', 'needs', 'lessonsMode']);
  pupilsDisplayedColumnsList = ['submittedDate', 'name', 'email', 'phone', 'needs', 'lessonsMode'];
  pupils: Pupil[];

  constructor(public pupilsService: PupilsService, private router: Router, public user: UserConfigService, public route: ActivatedRoute) {
    this.route.data.subscribe((data) => this.init(data.config));
    // this.pupilsData.filterPredicate = (pupil: Pupil, filter: string) => {
    //   const results = filter.split(';').map((fstr) => {
    //     if (pupil.name?.toLowerCase().includes(fstr)) return true;
    //     if (pupil.email?.toLowerCase().includes(fstr)) return true;
    //     if (pupil.phone?.toLowerCase().includes(fstr)) return true;
    //     if (pupil.remoteOrStationary) if (lessonsModeData[pupil.remoteOrStationary].toLowerCase().includes(fstr)) return true;
    //     if (pupil.submittedDate?.toString().includes(fstr)) return true;
    //     if (pupil.notes?.includes(fstr)) return true;
    //     if (pupil.teaches) {
    //       if (!!Object.keys(pupil.teaches).find((subject) => subject.includes(fstr))) return true;
    //       if (
    //         !!Object.keys(pupil.teaches).find((subject) => {
    //           return !!Object.keys(pupil.teaches[subject])
    //             .filter((level) => pupil.teaches[subject][level])
    //             .find((level) => {
    //               if ((subject + '-' + level).includes(fstr)) return true;
    //             });
    //         })
    //       )
    //         return true;
    //     }
    //     return false;
    //   });
    //   return results.reduce((a, b) => a && b, true);
    // };
  }

  init(config: UserConfig) {
    if (config.pupilsListDisplayedColumns) this.pupilsDisplayedColumns.setValue(config.pupilsListDisplayedColumns);
  }

  ngOnInit() {
    this.pupilsService.pupilsList$.pipe(tap(console.log)).subscribe((pupils) => (this.pupilsData.data = this.pupils = pupils));
    this.pupilsDisplayedColumns.valueChanges.subscribe((value) => (this.user.pupilsListDisplayedColumns = value));
  }

  edit(pupil: Pupil) {
    this.router.navigateByUrl(`/admin/pupil/${pupil._id}`);
  }

  columnName(desc: string) {
    switch (desc) {
      case 'submittedDate':
        return 'Data zgłoszenia';
      case 'name':
        return 'Imię i nazwisko';
      case 'email':
        return 'Email kontaktowy';
      case 'phone':
        return 'Nr telefonu';
      case 'needs':
        return 'Przedmioty';
      case 'lessonsMode':
        return 'Preferowany tryb';
      case 'pupil':
        return 'Uczeń?';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pupilsData.filter = filterValue.trim().toLowerCase();
  }
}
