import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-insufficient-permissions',
  templateUrl: './insufficient-permissions.component.html',
  styleUrls: ['./insufficient-permissions.component.scss'],
})
export class InsufficientPermissionsComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
