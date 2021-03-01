import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Pupil } from 'src/app/core/models/pupil';
import { PupilsService } from 'src/app/core/services/pupils.service';
import { selectBetween } from 'src/app/shared/components/multiselect-checkbox/multiselect-checkbox.component';
import { CovidAlertDialogComponent } from '../../components/covid-alert-dialog/covid-alert-dialog.component';
import { FormFailureDialogComponent } from '../../components/form-failure-dialog/form-failure-dialog.component';
import { FormResultDialogData, FormSuccessDialogComponent } from '../../components/form-success-dialog/form-success-dialog.component';

@Component({
  selector: 'app-pupil-form',
  templateUrl: './pupil-form.component.html',
  styleUrls: ['./pupil-form.component.scss'],
})
export class PupilFormComponent implements AfterViewInit {
  contactForm: FormGroup;
  parentForm: FormGroup;
  lessonsForm: FormGroup;
  clausesForm: FormGroup;

  wybranePrzedmioty: string[] = [];

  constructor(private dialog: MatDialog, private location: Location, private pupils: PupilsService) {
    this.initializeForms();

    this.lessonsForm
      .get('needs')!
      .valueChanges.pipe(
        map((o: { [name: string]: boolean }) => {
          console.log('[valueChanges]', o);
          let a: string[] = [];
          for (let x in o) {
            if (o[x]) a.push(x);
          }
          return a;
        })
      )
      ?.subscribe((wybranePrzedmioty) => (this.wybranePrzedmioty = wybranePrzedmioty));
  }

  ngAfterViewInit() {
    this.dialog.open(CovidAlertDialogComponent);
  }

  submit() {
    if (this.contactForm.valid && this.parentForm.valid && this.lessonsForm.valid && this.clausesForm.valid) {
      let pupil: Pupil = Object.assign({}, this.contactForm.value, this.parentForm.value);
      pupil.contactEmail = this.contactForm.value.email;
      pupil.mainNeeds = this.lessonsForm.value.mainNeeds;
      pupil.remoteOrStationary = this.lessonsForm.value.remoteOrStationary;
      pupil.submittedBy = 'himself';
      if (this.lessonsForm.value.alreadyAttended) pupil.notes = `Uczęszczał(a) na korepetycje wcześniej`;
      if (this.lessonsForm.value.previousTutor) pupil.notes += ' z ' + this.lessonsForm.value.previousTutor;
      pupil.needs = Object.keys(this.lessonsForm.value.needs).filter((v) => this.lessonsForm.value.needs[v]);
      const dialogData: FormResultDialogData = { mode: 'pupil', email: this.contactForm.value.email };
      this.pupils
        .createPupil(pupil)
        .then(() => {
          const dialogRef = this.dialog.open(FormSuccessDialogComponent, { width: '500px', data: dialogData });
          dialogRef.afterClosed().subscribe(() => this.location.back());
        })
        .catch(() => {
          this.dialog.open(FormFailureDialogComponent, { width: '500px', data: dialogData });
        });
    }
  }

  private initializeForms() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      class: new FormControl(null, Validators.required),
      phone: new FormControl(),
      isMature: new FormControl(false),
    });

    this.parentForm = new FormGroup({
      parentName: new FormControl(),
      parentEmail: new FormControl(null, Validators.email),
      parentPhone: new FormControl(),
    });

    this.lessonsForm = new FormGroup({
      needs: new FormControl(
        {
          matematyka: false,
          fizyka: false,
          chemia: false,
          biologia: false,
          polski: false,
          historia: false,
          angielski: false,
          niemiecki: false,
        },
        selectBetween(1, 20)
      ),
      mainNeeds: new FormControl(),
      remoteOrStationary: new FormControl(null, Validators.required),
      alreadyAttended: new FormControl(false),
      previousTutor: new FormControl(),
    });

    this.clausesForm = new FormGroup({
      clause1: new FormControl(false, Validators.requiredTrue),
      clause2: new FormControl(false, Validators.requiredTrue),
      clause3: new FormControl(false, Validators.requiredTrue),
    });
  }

  private debugMode() {
    this.contactForm.patchValue({
      name: 'test',
      email: 'test@test',
      class: 'test',
    });
    this.lessonsForm.patchValue({
      needs: {
        matematyka: true,
      },
      remoteOrStationary: 3,
    });
    this.clausesForm.patchValue({
      clause1: true,
      clause2: true,
      clause3: true,
    });
  }
}
