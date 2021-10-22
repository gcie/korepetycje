import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsViewResolver implements Resolve<boolean> {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.adminService.ready;
  }
}
