import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';
import { lessonsStateData } from 'src/app/core/enum/lessons-state.enum';
import { defaultLessons } from 'src/app/core/models/lessons';
import { KorepetycjeService } from 'src/app/core/services/korepetycje.service';

@Component({
  selector: 'app-new-lessons-dialog',
  templateUrl: './new-lessons-dialog.component.html',
  styleUrls: ['./new-lessons-dialog.component.scss'],
})
export class NewLessonsDialogComponent {
  form: FormGroup;

  lessonsStateData = lessonsStateData;
  lessonsModeData = lessonsModeData;

  constructor(
    private dialogRef: MatDialogRef<NewLessonsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    public korepetycje: KorepetycjeService
  ) {
    this.form = this.formBuilder.group(
      Object.assign({}, defaultLessons, {
        tutorId: [data.tutorId, Validators.required],
        pupilId: [data.pupilId, Validators.required],
      })
    );
  }

  async submit() {
    if (this.form.valid) {
      await this.korepetycje.lessons.createLessons(this.form.value);
      this.dialogRef.close();
    }
  }
}
