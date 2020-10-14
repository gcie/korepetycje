import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'form', loadChildren: () => import('src/app/modules/form/form.module').then((m) => m.FormModule) },
  // { path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then((m) => m.LoginModule) },
  // { path: '', loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'form' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
