import { Component, EventEmitter, Output } from '@angular/core';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

@Component({
  selector: 'app-noop-checkbox',
  templateUrl: './noop-checkbox.component.html',
  styleUrls: ['./noop-checkbox.component.scss'],
  providers: [{ provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } }],
})
export class NoopCheckboxComponent {
  @Output('clicked') onClick = new EventEmitter<void>();
}
