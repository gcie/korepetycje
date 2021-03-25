import { Component, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-selectable-list-item',
  templateUrl: './selectable-list-item.component.html',
  styleUrls: ['./selectable-list-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectableListItemComponent),
      multi: true,
    },
  ],
})
export class SelectableListItemComponent implements ControlValueAccessor {
  @Input() title: string;
  @Input() labelWidth = 30;
  @Input() data: { [key: string]: any };
  @Input() equal = (o1, o2) => (o1 instanceof Object && o2 instanceof Object ? o1._id == o2._id : o1 == o2);

  @ViewChild('select') select: MatSelect;

  value: any;
  onChange = (_: any) => {};

  editMode = false;
  wasInsideClick = false;

  getDisplayValue() {
    return Object.keys(this.data).find((key) => this.equal(this.value, this.data[key]));
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  submit() {
    this.onChange(this.value);
  }

  triggerEdit() {
    this.editMode = true;
    setTimeout(() => {
      this.select.open();
    });
  }

  registerOnTouched(fn: any): void {}

  cancel() {
    this.editMode = false;
  }

  @HostListener('click')
  clickInside() {
    this.wasInsideClick = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInsideClick) {
      this.cancel();
    }
    this.wasInsideClick = false;
  }
}
