import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep, isEqual } from 'lodash-es';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';
import { lessonsStateData } from 'src/app/core/enum/lessons-state.enum';
import { defaultLessons, Lessons } from 'src/app/core/models/lessons';
import { defaultPupil, Pupil } from 'src/app/core/models/pupil';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { PupilsService } from 'src/app/core/services/pupils.service';
import { TutorsService } from 'src/app/core/services/tutors.service';
import { AdminChild } from '../../admin.component';
import { NewLessonsDialogComponent } from '../../components/new-lessons-dialog/new-lessons-dialog.component';
import { PupilDetailedViewData } from './pupil-detailed-view.resolver';

@Component({
  selector: 'app-pupil-detailed-view',
  templateUrl: './pupil-detailed-view.component.html',
  styleUrls: ['./pupil-detailed-view.component.scss'],
})
export class PupilDetailedViewComponent implements AdminChild {
  title: Subject<string>;
  name = 'pupilDetails';
  canGoBack = true;
  dirty = false;

  pupilId: string;
  lessonsId: string;
  pupil: Pupil;
  lessons: Lessons[];
  pupilForm: FormGroup;
  lessonsForms: FormGroup[];

  lessonsModeData = lessonsModeData;
  lessonsStateData = lessonsStateData;

  selectTutorData: Observable<{ [name: string]: string }> = this.tutorsService.data.pipe(
    map((tutors) => {
      const o: { [name: string]: string } = {};
      tutors.forEach((t) => (o[t.name] = t._id));
      return o;
    })
  );

  initialData: PupilDetailedViewData;

  subjects = ['matematyka', 'fizyka', 'chemia', 'biologia', 'polski', 'historia', 'angielski', 'niemiecki'];

  constructor(
    private route: ActivatedRoute,
    private pupilsService: PupilsService,
    private tutorsService: TutorsService,
    private lessonsService: LessonsService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.pupilId = this.route.snapshot.params.id;
    this.initialData = this.route.snapshot.data.data;

    this.pupil = cloneDeep(this.initialData.pupil);
    this.lessons = cloneDeep(this.initialData.lessons || []);

    this.pupilForm = this.formBuilder.group(Object.assign({}, defaultPupil, this.pupil, { needs: [this.pupil.needs] }));
    this.pupilForm.valueChanges.subscribe(this.updateDirtiness.bind(this));

    this.lessonsForms = this.lessons.map((lessons) => this.formBuilder.group(Object.assign({}, defaultLessons, lessons)));
    this.lessonsForms.forEach((form) => form.valueChanges.subscribe(this.updateDirtiness.bind(this)));

    this.title = new BehaviorSubject<string>(`Uczniowie - ${this.pupil.name}`);
  }

  canDeactivate() {
    if (!this.dirty) return true;
    return this.dialogService.windowConfirm('Odrzucić zmiany?');
  }

  updateDirtiness() {
    this.dirty =
      !isEqual(this.pupilForm.value, this.initialData.pupil) ||
      !isEqual(
        this.lessonsForms.map((form) => form.value),
        this.initialData.lessons
      );
  }

  save() {
    if (this.dirty) {
      this.pupilsService.updatePupil(this.pupilId, this.pupilForm.value);
      this.initialData.pupil = this.pupilForm.value;
      this.lessonsForms.forEach((form) => this.lessonsService.updateLessons(form.value._id, form.value));
      this.initialData.lessons = this.lessonsForms.map((form) => form.value);
      this.dirty = false;
    }
  }

  deleteLessons(id: string) {
    this.dialogService.confirm('Czy na pewno chcesz usunąć wybrane korepetycje?').subscribe(async (result) => {
      if (result) {
        await this.lessonsService.deleteLessons(id);
        this.updateLessons();
      }
    });
  }

  newLessons() {
    this.dialog
      .open(NewLessonsDialogComponent, {
        data: { pupilId: this.pupilId },
      })
      .afterClosed()
      .subscribe(this.updateLessons.bind(this));
  }

  private async updateLessons() {
    const lessons = await this.lessonsService.getLessonsByPupilId(this.pupilId).pipe(take(1)).toPromise();
    this.lessons = cloneDeep(lessons || []);
    this.lessonsForms = this.lessons.map((lessons) => this.formBuilder.group(Object.assign({}, defaultLessons, lessons)));
    this.lessonsForms.forEach((form) => form.valueChanges.subscribe(this.updateDirtiness.bind(this)));
  }
}
