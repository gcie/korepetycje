import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormClausesComponent } from './components/form-clauses/form-clauses.component';
import { FormFailureDialogComponent } from './components/form-failure-dialog/form-failure-dialog.component';
import { FormSuccessDialogComponent } from './components/form-success-dialog/form-success-dialog.component';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { FormHomeComponent } from './views/form-home/form-home.component';
import { ParentFormComponent } from './views/parent-form/parent-form.component';
import { PupilFormComponent } from './views/pupil-form/pupil-form.component';
import { TutorFormComponent } from './views/tutor-form/tutor-form.component';
import { CovidAlertDialogComponent } from './components/covid-alert-dialog/covid-alert-dialog.component';

@NgModule({
  declarations: [
    FormComponent,
    FormSuccessDialogComponent,
    FormClausesComponent,
    FormHomeComponent,
    PupilFormComponent,
    ParentFormComponent,
    TutorFormComponent,
    FormFailureDialogComponent,
    CovidAlertDialogComponent,
  ],
  imports: [CommonModule, SharedModule, FormRoutingModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class FormModule {}
