import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserConfigResolver } from 'src/app/core/resolvers/user-config.resolver';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './admin.component';
import { SettingsItemComponent } from './components/settings-item/settings-item.component';
import { PupilDetailedViewComponent } from './views/pupil-detailed-view/pupil-detailed-view.component';
import { PupilsListViewComponent } from './views/pupils-list-view/pupils-list-view.component';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';
import { SettingsViewResolver } from './views/settings-view/settings-view.resolver';
import { TutorDetailedViewComponent } from './views/tutor-detailed-view/tutor-detailed-view.component';
import { TutorsListViewComponent } from './views/tutors-list-view/tutors-list-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin/settings' },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'settings', component: SettingsViewComponent, resolve: { config: UserConfigResolver, data: SettingsViewResolver } },
      { path: 'tutors', component: TutorsListViewComponent, resolve: { config: UserConfigResolver } },
      { path: 'pupils', component: PupilsListViewComponent, resolve: { config: UserConfigResolver } },
      { path: 'tutor/:id', component: TutorDetailedViewComponent },
      { path: 'pupil/:id', component: PupilDetailedViewComponent },
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
  ],
  imports: [CommonModule, MaterialModule, SharedModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
