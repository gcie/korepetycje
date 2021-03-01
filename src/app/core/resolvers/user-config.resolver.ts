import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { UserConfig } from 'src/app/core/models/user';
import { UserConfigService } from '../services/user-config.service';

@Injectable({ providedIn: 'root' })
export class UserConfigResolver implements Resolve<UserConfig> {
  constructor(private user: UserConfigService) {}

  resolve(): Observable<any> | Promise<any> | any {
    return this.user.data.pipe(
      filter((x) => !!x),
      first()
    );
  }
}
