import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-clauses',
  templateUrl: './form-clauses.component.html',
  styleUrls: ['./form-clauses.component.scss'],
})
export class FormClausesComponent {
  @Input('formGroup') clausesForm: FormGroup;
}
