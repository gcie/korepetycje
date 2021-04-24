import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { all } from 'src/app/core/models/operators';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { TutorsService } from 'src/app/core/services/tutors.service';

@Injectable({
  providedIn: 'root',
})
export class TutorDetailedViewResolver implements Resolve<boolean> {
  constructor(private tutorsService: TutorsService, private lessonsService: LessonsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return all(this.tutorsService.ready, this.lessonsService.ready);
  }
}
