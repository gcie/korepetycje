import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Lessons } from 'src/app/core/models/lessons';
import { Tutor } from 'src/app/core/models/tutor';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { TutorsService } from 'src/app/core/services/tutors.service';

export interface TutorDetailedViewData {
  tutor: Tutor;
  lessons: Lessons[];
}

@Injectable({
  providedIn: 'root',
})
export class TutorDetailedViewResolver implements Resolve<TutorDetailedViewData> {
  constructor(private tutorsService: TutorsService, private lessonsService: LessonsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TutorDetailedViewData> {
    return forkJoin({
      tutor: this.tutorsService.getTutorRef(route.params.id).pipe(take(1)),
      lessons: this.lessonsService.getLessonsByTutorId(route.params.id).pipe(take(1)),
    });
  }
}
