import {Routes} from '@angular/router';
import {ItemComponent} from './pages/item/item.component';
import {ClientComponent} from './pages/client/client.component';
import {WarehouseComponent} from './pages/warehouse/warehouse.component';
import {UserComponent} from './pages/user/user.component';

export const DASHBOARD_ROUTES: Routes = [
  {path: 'item', component: ItemComponent},
  {path: 'clients', component: ClientComponent},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'user', component: UserComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'budget'}
];
