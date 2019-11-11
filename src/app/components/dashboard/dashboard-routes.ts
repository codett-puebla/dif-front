import {Routes} from '@angular/router';
import {ItemComponent} from './pages/item/item.component';

export const DASHBOARD_ROUTES: Routes = [
  {path: 'item', component: ItemComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'budget'}
];
