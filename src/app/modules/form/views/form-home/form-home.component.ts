import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-home',
  templateUrl: './form-home.component.html',
  styleUrls: ['./form-home.component.scss'],
})
export class FormHomeComponent {
  constructor(private router: Router) {}

  select(path: string) {
    this.router.navigateByUrl(`/form/${path}`);
  }
}
