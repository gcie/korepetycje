import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { UserConfigResolver } from 'src/app/core/resolvers/user-config.resolver';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './admin.component';
import { NewLessonsDialogComponent } from './components/new-lessons-dialog/new-lessons-dialog.component';
import { SettingsItemComponent } from './components/settings-item/settings-item.component';
import { PupilDetailedViewComponent } from './views/pupil-detailed-view/pupil-detailed-view.component';
import { PupilDetailedViewResolver } from './views/pupil-detailed-view/pupil-detailed-view.resolver';
import { PupilsListViewComponent } from './views/pupils-list-view/pupils-list-view.component';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';
import { SettingsViewResolver } from './views/settings-view/settings-view.resolver';
import { TutorDetailedViewComponent } from './views/tutor-detailed-view/tutor-detailed-view.component';
import { TutorDetailedViewResolver } from './views/tutor-detailed-view/tutor-detailed-view.resolver';
import { TutorsListViewComponent } from './views/tutors-list-view/tutors-list-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin/settings' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'settings',
        component: SettingsViewComponent,
        resolve: { config: UserConfigResolver, data: SettingsViewResolver },
        canDeactivate: [CanDeactivateGuard],
      },
      { path: 'tutors', component: TutorsListViewComponent, resolve: { config: UserConfigResolver } },
      { path: 'pupils', component: PupilsListViewComponent, resolve: { config: UserConfigResolver } },
      {
        path: 'tutor/:id',
        component: TutorDetailedViewComponent,
        resolve: { data: TutorDetailedViewResolver },
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'pupil/:id',
        component: PupilDetailedViewComponent,
        resolve: { data: PupilDetailedViewResolver },
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    TutorsListViewComponent,
    TutorDetailedViewComponent,
    AdminComponent,
    SettingsViewComponent,
    SettingsItemComponent,
    PupilsListViewComponent,
    PupilDetailedViewComponent,
    NewLessonsDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
