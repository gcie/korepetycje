import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Lessons } from 'src/app/core/models/lessons';
import { Pupil } from 'src/app/core/models/pupil';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { PupilsService } from 'src/app/core/services/pupils.service';

export interface PupilDetailedViewData {
  pupil: Pupil;
  lessons: Lessons[];
}

@Injectable({
  providedIn: 'root',
})
export class PupilDetailedViewResolver implements Resolve<PupilDetailedViewData> {
  constructor(private pupilsService: PupilsService, private lessonsService: LessonsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PupilDetailedViewData> {
    return forkJoin({
      pupil: this.pupilsService.getPupilRef(route.params.id).pipe(take(1)),
      lessons: this.lessonsService.getLessonsByPupilId(route.params.id).pipe(take(1)),
    });
  }
}
