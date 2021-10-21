import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormClausesComponent } from './components/form-clauses/form-clauses.component';
import { FormFailureDialogComponent } from './components/form-failure-dialog/form-failure-dialog.component';
import { FormSuccessDialogComponent } from './components/form-success-dialog/form-success-dialog.component';
import { FormComponent } from './form.component';
import { FormHomeComponent } from './views/form-home/form-home.component';
import { ParentFormComponent } from './views/parent-form/parent-form.component';
import { PupilFormComponent } from './views/pupil-form/pupil-form.component';
import { TutorFormComponent } from './views/tutor-form/tutor-form.component';

const routes: Routes = [
  { path: '', component: FormHomeComponent },
  { path: 'pupil', component: PupilFormComponent },
  { path: 'parent', component: ParentFormComponent },
  { path: 'tutor', component: TutorFormComponent },
];

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
  ],
  imports: [CommonModule, SharedModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild(routes)],
})
export class FormModule {}
