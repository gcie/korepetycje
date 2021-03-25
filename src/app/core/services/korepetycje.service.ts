import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pupil } from '../models/pupil';
import { Tutor } from '../models/tutor';
import { LessonsService } from './lessons.service';
import { PupilsService } from './pupils.service';
import { TutorsService } from './tutors.service';

@Injectable({
  providedIn: 'root',
})
export class KorepetycjeService {
  constructor(public lessons: LessonsService, public pupils: PupilsService, public tutors: TutorsService) {}

  public tutorsListExtended = combineLatest([this.tutors.data, this.lessons.data, this.pupils.data]).pipe(
    map(([tutors, lessons, pupils]) => {
      const tutorsExt: Tutor[] = cloneDeep(tutors);
      tutorsExt.forEach((t) => (t.students = t.students || []));
      lessons.forEach((l) => {
        const pupil = pupils.find((p) => p._id == l.pupilId);
        const tutor = tutorsExt.find((t) => t._id == l.tutorId);
        tutor?.students?.push(pupil?.name);
      });
      return tutorsExt;
    })
  );

  public pupilsListExtended = combineLatest([this.tutors.data, this.lessons.data, this.pupils.data]).pipe(
    map(([tutors, lessons, pupils]) => {
      const pupilsExt: Pupil[] = cloneDeep(pupils);
      pupilsExt.forEach((p) => (p.tutors = p.tutors || []));
      lessons.forEach((l) => {
        const pupil = pupilsExt.find((p) => p._id == l.pupilId);
        const tutor = tutors.find((t) => t._id == l.tutorId);
        pupil?.tutors?.push(tutor?.name);
      });
      return pupilsExt;
    })
  );

  public freeTutors = combineLatest([this.tutors.data, this.lessons.data]).pipe(
    map(([tutors, lessons]) => tutors.filter((t) => !lessons.some((l) => l.tutorId == t._id)))
  );
}
