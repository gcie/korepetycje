import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { all } from 'src/app/core/models/operators';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { PupilsService } from 'src/app/core/services/pupils.service';

@Injectable({
  providedIn: 'root',
})
export class PupilDetailedViewResolver implements Resolve<boolean> {
  constructor(private pupilsService: PupilsService, private lessonsService: LessonsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return all(this.pupilsService.ready, this.lessonsService.ready);
  }
}
