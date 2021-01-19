import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { SettingsViewData } from './settings-view.data';

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
