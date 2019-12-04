import {Routes} from '@angular/router';
import {ItemComponent} from './pages/item/item.component';
import {ClientComponent} from './pages/client/client.component';
import {WarehouseComponent} from './pages/warehouse/warehouse.component';
import {UserComponent} from './pages/user/user.component';
import {EntryComponent} from './pages/entry/entry.component';
import {DepartureComponent} from './pages/departure/departure.component';
import {InventoryComponent} from './pages/inventory/inventory.component';
import {TransactionComponent} from './pages/transaction/transaction.component';
import {IndexComponent} from '../shared/index/index.component';
import {AdminGuardGuard} from '../../guards/admin-guard.guard';

export const DASHBOARD_ROUTES: Routes = [
    {path: 'index', component: IndexComponent},
    {path: 'user', component: UserComponent, canActivate: [AdminGuardGuard]},
    {path: 'clients', component: ClientComponent, canActivate: [AdminGuardGuard]},
    {path: 'item', component: ItemComponent, canActivate: [AdminGuardGuard]},
    {path: 'warehouse', component: WarehouseComponent, canActivate: [AdminGuardGuard]},
    {path: 'inventory', component: InventoryComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: 'entry', component: EntryComponent},
    {path: 'departure', component: DepartureComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'budget'}
];
