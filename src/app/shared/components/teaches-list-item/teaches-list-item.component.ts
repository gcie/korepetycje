import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PromptStringValueDialogComponent } from '../prompt-string-value-dialog/prompt-string-value-dialog.component';

@Component({
  selector: 'app-teaches-list-item',
  templateUrl: './teaches-list-item.component.html',
  styleUrls: ['./teaches-list-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeachesListItemComponent),
      multi: true,
    },
  ],
})
export class TeachesListItemComponent implements ControlValueAccessor {
  constructor(private dialog: MatDialog) {}

  @Input() type: string;
  @Input() labelWidth = 20;

  newRowMode = true;

  value: {
    [subject: string]: {
      sp: boolean;
      lo: boolean;
      matura: boolean;
    };
  };
  subjects: string[];

  onChange = (_: any) => {};

  writeValue(value: any): void {
    this.value = value;
    this.subjects = Object.keys(value);
    console.log('[TeachesListItemComponent] value:', value);
  }

  registerOnTouched(fn: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  submit() {
    this.onChange(this.value);
  }

  addSubject() {
    const subjectPromptDialogRef = this.dialog.open(PromptStringValueDialogComponent, {
      data: {
        title: 'Podaj nazwę przedmiotu',
        // prompt: 'Zapytanie',
        label: 'Przedmiot',
        placeholder: 'matematyka, polski...',
      },
    });

    subjectPromptDialogRef.afterClosed().subscribe((subject) => {
      console.log(subject);
      if (subject && !Object.keys(this.value).includes(subject)) {
        this.value[subject] = { sp: false, lo: false, matura: false };
        this.subjects.push(subject);
        this.onChange(this.value);
      }
    });
  }

  deleteSubject(subject: string) {
    this.subjects = this.subjects.filter((s) => s != subject);
    delete this.value[subject];
    this.onChange(this.value);
  }
}
