import {Routes} from '@angular/router';
import {ItemComponent} from './pages/item/item.component';
import {ClientComponent} from './pages/client/client.component';

export const DASHBOARD_ROUTES: Routes = [
  {path: 'item', component: ItemComponent},
  {path: 'clients', component: ClientComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'budget'}
];
