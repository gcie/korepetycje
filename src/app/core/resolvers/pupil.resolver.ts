import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Pupil } from '../models/pupil';
import { PupilsService } from '../services/pupils.service';

@Injectable({ providedIn: 'root' })
export class PupilResolver implements Resolve<Pupil> {
  constructor(private pupilsService: PupilsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.pupilsService.getPupil(route.paramMap.get('id'));
  }
}
