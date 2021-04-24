import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { isEqual } from 'lodash-es';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';
import { lessonsStateData } from 'src/app/core/enum/lessons-state.enum';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { defaultLessons, Lessons } from 'src/app/core/models/lessons';
import { defaultTutor, Tutor } from 'src/app/core/models/tutor';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { PupilsService } from 'src/app/core/services/pupils.service';
import { TutorsService } from 'src/app/core/services/tutors.service';
import { AdminChild } from '../../admin.component';
import { NewLessonsDialogComponent } from '../../components/new-lessons-dialog/new-lessons-dialog.component';

@Component({
  selector: 'app-tutor-detailed-view',
  templateUrl: './tutor-detailed-view.component.html',
  styleUrls: ['./tutor-detailed-view.component.scss'],
})
export class TutorDetailedViewComponent implements AdminChild, CanComponentDeactivate {
  title: Subject<string>;
  name = 'tutorDetails';
  canGoBack = true;
  dirty = false;

  tutorId: string;
  lessonsId: string;
  tutor: Tutor;
  lessons: Lessons[] = [];
  tutorForm: FormGroup;
  lessonsForms: FormGroup[] = [];

  lessonsModeData = lessonsModeData;
  lessonsStateData = lessonsStateData;

  selectPupilData: Observable<{ [name: string]: string }> = this.pupilsService.data.pipe(
    map((pupils) => {
      const o: { [name: string]: string } = {};
      pupils.forEach((p) => (o[p.name] = p._id));
      return o;
    })
  );

  constructor(
    private route: ActivatedRoute,
    private tutorsService: TutorsService,
    private pupilsService: PupilsService,
    private lessonsService: LessonsService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.tutorId = this.route.snapshot.params.id;
    this.tutor = this.tutorsService.getTutor(this.tutorId);
    this.lessons = this.lessonsService.getLessonsByTutorId(this.tutorId) || [];
    this.title = new BehaviorSubject<string>(`Korepetytorzy - ${this.tutor.name}`);

    this.tutorsService.getTutor$(this.tutorId).subscribe((tutor) => {
      this.tutor = tutor;
      this.tutorForm = this.formBuilder.group(Object.assign({}, defaultTutor, this.tutor));
      this.tutorForm.valueChanges.subscribe(this.updateDirtiness.bind(this));
      this.updateDirtiness();
    });

    this.lessonsService.getLessonsByTutorId$(this.tutorId).subscribe((lessons) => {
      this.lessons = lessons || [];
      this.lessonsForms = this.lessons.map((lessons) => this.formBuilder.group(Object.assign({}, defaultLessons, lessons)));
      this.lessonsForms.forEach((form) => form.valueChanges.subscribe(this.updateDirtiness.bind(this)));
      this.updateDirtiness();
    });
  }

  canDeactivate() {
    if (!this.dirty) return true;
    return this.dialogService.confirm('Odrzucić zmiany?');
  }

  updateDirtiness() {
    this.dirty =
      !isEqual(this.tutorForm.value, this.tutor) ||
      !isEqual(
        this.lessonsForms.map((form) => form.value),
        this.lessons
      );
  }

  save() {
    if (this.dirty) {
      this.tutorsService.updateTutor(this.tutorId, this.tutorForm.value);
      this.lessonsForms.forEach((form) => this.lessonsService.updateLessons(form.value._id, form.value));
    }
  }

  deleteLessons(id: string) {
    this.dialogService.confirm('Czy na pewno chcesz usunąć wybrane korepetycje?').subscribe(async (result) => {
      if (result) {
        await this.lessonsService.deleteLessons(id);
      }
    });
  }

  newLessons() {
    this.dialog.open(NewLessonsDialogComponent, {
      data: { tutorId: this.tutorId },
    });
  }
}
