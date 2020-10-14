import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
