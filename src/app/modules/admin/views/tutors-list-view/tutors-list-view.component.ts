import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tutor } from 'src/app/core/models/tutor';
import { TutorsService } from 'src/app/core/services/tutors.service';

@Component({
  selector: 'app-tutors-list-view',
  templateUrl: './tutors-list-view.component.html',
  styleUrls: ['./tutors-list-view.component.scss'],
})
export class TutorsListViewComponent implements OnInit {
  title: Observable<string> = new BehaviorSubject<string>('Lista korepetytorów');

  tutorsData = new MatTableDataSource<Tutor>();
  tutorsDisplayedColumns = new FormControl(['name', 'email', 'phone', 'teaches', 'lessonsMode', 'pupil']);
  tutorsDisplayedColumnsList = ['name', 'email', 'phone', 'teaches', 'lessonsMode', 'pupil'];
  tutors: Tutor[];

  constructor(public tutorsService: TutorsService, private router: Router) {}

  ngOnInit(): void {
    this.tutorsService.tutorsList$.subscribe((tutors) => {
      console.log(tutors);
      this.tutorsData.data = tutors;
      this.tutors = tutors;
    });
  }

  edit(tutor: Tutor) {
    // console.log(this.tutorsDisplayedColumns);
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
        return 'Uczy';
      case 'lessonsMode':
        return 'PreferowanyTryb';
      case 'pupil':
        return 'Uczeń?';
    }
  }
}
