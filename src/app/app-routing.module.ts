import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DASHBOARD_ROUTES} from './components/dashboard/dashboard-routes';
import {NotFoundComponent} from './components/shared/not-found/not-found.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    // {path : 'dashboard', component: DashboardComponent, children : DASHBOARD_ROUTES, canActivate: [ AuthGuard ] },
    {path: 'dashboard', component: DashboardComponent, children: DASHBOARD_ROUTES},
    {path: '404', component: NotFoundComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', pathMatch: 'full', redirectTo: '/404'}
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
