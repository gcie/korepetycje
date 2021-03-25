import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ManagerGuard } from './core/guards/manager.guard';

export class AppRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig.path === 'tutors' || route.routeConfig.path === 'pupils';
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(route.routeConfig.path, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.path);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(route.routeConfig.path);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

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
