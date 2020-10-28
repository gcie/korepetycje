import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tutor } from 'src/app/core/models/tutor';
import { TutorsService } from 'src/app/core/services/tutors.service';

@Component({
  selector: 'app-tutors-list-view',
  templateUrl: './tutors-list-view.component.html',
  styleUrls: ['./tutors-list-view.component.scss'],
})
export class TutorsListViewComponent implements OnInit {
  tutorsData = new MatTableDataSource<Tutor>();
  tutorsDisplayedColumns = ['name', 'email', 'phone', 'settings'];

  constructor(public tutors: TutorsService, private router: Router) {}

  ngOnInit(): void {
    this.tutors.tutorsList$.subscribe((tutors) => {
      console.log(tutors);
      this.tutorsData.data = tutors;
    });
  }

  edit(tutor: Tutor) {
    this.router.navigateByUrl(`/admin/tutor/${tutor._id}`);
  }
}
