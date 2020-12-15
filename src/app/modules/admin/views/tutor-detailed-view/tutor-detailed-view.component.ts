import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';
import { Tutor } from 'src/app/core/models/tutor';
import { TutorsService } from 'src/app/core/services/tutors.service';
import { AdminChild } from '../../admin.component';

@Component({
  selector: 'app-tutor-detailed-view',
  templateUrl: './tutor-detailed-view.component.html',
  styleUrls: ['./tutor-detailed-view.component.scss'],
})
export class TutorDetailedViewComponent implements OnInit, AdminChild {
  title: Subject<string> = new BehaviorSubject<string>('Korepetytorzy');
  name = 'tutorDetails';
  canGoBack = true;

  id: string;
  tutor: Observable<Tutor>;
  tutorForm = new FormGroup({});
  tutorFormChangeSubscription: Subscription;
  initializedForm = false;
  subjects = ['matematyka'];
  lessonsModeData = lessonsModeData;

  constructor(private route: ActivatedRoute, private tutors: TutorsService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.tutor = this.tutors.getTutor(params.id);
    });

    this.tutor.subscribe((tutor) => {
      this.tutorForm = this.formBuilder.group(tutor);
      this.initializedForm = true;
      this.tutorFormSubToChange();
      this.title.next(`Korepetytorzy - ${tutor.name}`);
    });
  }

  tutorFormSubToChange() {
    this.tutorFormChangeSubscription?.unsubscribe();
    this.tutorFormChangeSubscription = this.tutorForm.valueChanges.subscribe(this.tutorFormValueChange.bind(this));
  }

  tutorFormValueChange(value: any) {
    console.log('[tutorForm]', value);
    this.tutors.updateTutor(this.id, value);
  }
}
