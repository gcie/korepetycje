import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';
import { Tutor } from 'src/app/core/models/tutor';
import { UserConfig } from 'src/app/core/models/user';
import { DialogService } from 'src/app/core/services/dialog.service';
import { KorepetycjeService } from 'src/app/core/services/korepetycje.service';
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
  tutorsDisplayedColumns = new FormControl(['submittedDate', 'name', 'email', 'phone', 'teaches', 'lessonsMode', 'pupil']);
  tutorsDisplayedColumnsList = ['submittedDate', 'name', 'email', 'phone', 'teaches', 'lessonsMode', 'pupil'];
  tutors: Tutor[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tutorsService: TutorsService,
    private korepetycjeService: KorepetycjeService,
    private dialogService: DialogService,
    private user: UserConfigService
  ) {
    this.route.data.subscribe((data) => this.init(data.config));
    this.tutorsData.filterPredicate = (tutor: Tutor, filter: string) => {
      const results = filter.split(';').map((fstr) => {
        if (tutor.name?.toLowerCase().includes(fstr)) return true;
        if (tutor.email?.toLowerCase().includes(fstr)) return true;
        if (tutor.phone?.toLowerCase().includes(fstr)) return true;
        if (tutor.remoteOrStationary) if (lessonsModeData[tutor.remoteOrStationary].toLowerCase().includes(fstr)) return true;
        if (tutor.submittedDate?.toString().includes(fstr)) return true;
        if (tutor.notes?.includes(fstr)) return true;
        if (tutor.teaches) {
          if (!!Object.keys(tutor.teaches).find((subject) => subject.includes(fstr))) return true;
          if (
            !!Object.keys(tutor.teaches).find((subject) => {
              return !!Object.keys(tutor.teaches[subject])
                .filter((level) => tutor.teaches[subject][level])
                .find((level) => {
                  if ((subject + '-' + level).includes(fstr)) return true;
                });
            })
          )
            return true;
        }
        return false;
      });
      return results.reduce((a, b) => a && b, true);
    };
  }

  init(config: UserConfig) {
    if (config.tutorsListDisplayedColumns) this.tutorsDisplayedColumns.setValue(config.tutorsListDisplayedColumns);
  }

  ngOnInit() {
    this.korepetycjeService.tutorsListExtended.subscribe((tutors) => (this.tutorsData.data = this.tutors = tutors));
    this.tutorsDisplayedColumns.valueChanges.subscribe((value) => (this.user.tutorsListDisplayedColumns = value));
  }

  edit(tutor: Tutor) {
    this.router.navigateByUrl(`/admin/tutor/${tutor._id}`);
  }

  delete(tutor: Tutor) {
    this.dialogService.confirm(`Czy na pewno chcesz usunąć korepetytora "${tutor.name}"?`).subscribe((result) => {
      if (result) {
        this.tutorsService.deleteTutor(tutor._id);
      }
    });
  }

  columnName(desc: string) {
    switch (desc) {
      case 'submittedDate':
        return 'Dana zgłoszenia';
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
        return 'Uczniowie';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tutorsData.filter = filterValue.trim().toLowerCase();
  }
}
