import {Routes} from '@angular/router';
import {ItemComponent} from './pages/item/item.component';
import {ClientComponent} from './pages/client/client.component';
import {WarehouseComponent} from './pages/warehouse/warehouse.component';
import {UserComponent} from './pages/user/user.component';
import {EntryComponent} from './pages/entry/entry.component';
import {DepartureComponent} from './pages/departure/departure.component';

export const DASHBOARD_ROUTES: Routes = [
    {path: 'item', component: ItemComponent},
    {path: 'clients', component: ClientComponent},
    {path: 'warehouse', component: WarehouseComponent},
    {path: 'entry', component: EntryComponent},
    {path: 'departure', component: DepartureComponent},
    {path: 'user', component: UserComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'budget'}
];
