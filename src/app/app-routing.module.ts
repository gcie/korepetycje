import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerGuard } from './core/guards/manager.guard';

const routes: Routes = [
  { path: 'form', loadChildren: () => import('src/app/modules/form/form.module').then((m) => m.FormModule) },
  { path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then((m) => m.LoginModule) },
  {
    path: 'admin',
    loadChildren: () => import('src/app/modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [ManagerGuard],
  },
  { path: 'error', loadChildren: () => import('src/app/modules/error/error.module').then((m) => m.ErrorModule) },
  // { path: '', loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard] },
  // { path: '**', pathMatch: 'full', redirectTo: 'form' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
