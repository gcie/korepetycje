import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NewPupilNotifications } from 'src/app/core/models/new-pupil-notifications';
import { NewTutorNotifications } from 'src/app/core/models/new-tutor-notifications';
import { AdminService } from 'src/app/core/services/admin.service';

export interface SettingsViewData {
  newPupilNotifications: NewPupilNotifications;
  newTutorNotifications: NewTutorNotifications;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsViewResolver implements Resolve<SettingsViewData> {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SettingsViewData> {
    return forkJoin({
      newPupilNotifications: this.adminService.getNewPupilNotifications(),
      newTutorNotifications: this.adminService.getNewTutorNotifications(),
    });
  }
}
