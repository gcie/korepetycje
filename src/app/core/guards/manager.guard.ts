import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/login'], {
            queryParams: {
              return: state.url,
            },
          });
          return false;
        } else if (!user.permissions.manager) {
          this.router.navigateByUrl('/error/insufficient-permissions');
          return false;
        }
        return true;
      })
    );
  }
}
