import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule, MatFormField,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, registerLocaleData} from '@angular/common';
import {DomseguroPipe} from '../../../pipes/domseguro.pipe';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
import {ContextMenuModule} from 'ngx-contextmenu';
import {ItemComponent} from './item/item.component';
import {DataTableComponent} from './item/data-table/data-table.component';
import {ClientComponent} from './client/client.component';
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "../../../Internalization/CustomMatPaginatorIntl";
import { ClientDataTableComponent } from './client/client-data-table/client-data-table.component';
import {MatSortModule} from "@angular/material/sort";
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseDataTableComponent } from './warehouse/warehouse-data-table/warehouse-data-table.component';
import { UserComponent } from './user/user.component';
import { UserDataTableComponent } from './user/user-data-table/user-data-table.component';
import {UserPipe} from '../../../pipes/user.pipe';
import { EntryComponent } from './entry/entry.component';
import { EntryDataTableComponent } from './entry/entry-data-table/entry-data-table.component';
import { DepartureComponent } from './departure/departure.component';
import { DepartureDataTableComponent } from './departure/departure-data-table/departure-data-table.component';
import {MatCardModule} from "@angular/material/card";
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryDataTableComponent } from './inventory/inventory-data-table/inventory-data-table.component';
import {TransactionDetailComponent} from '../../shared/dialogs/transaction-detail/transaction-detail.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TitleComponent } from '../../shared/title/title.component';

registerLocaleData(localeEs);

@NgModule({
    declarations: [
        DomseguroPipe,
        ItemComponent,
        DataTableComponent,
        ClientComponent,
        ClientDataTableComponent,
        WarehouseComponent,
        WarehouseDataTableComponent,
        UserComponent,
        UserDataTableComponent,
        UserPipe,
        EntryComponent,
        EntryDataTableComponent,
        DepartureComponent,
        DepartureDataTableComponent,
        InventoryComponent,
        InventoryDataTableComponent,
        TransactionComponent,
        TitleComponent,
    ],
    exports: [
        DomseguroPipe,
        MatFormField,
        TitleComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatIconModule,
        DragAndDropModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        ContextMenuModule,
        MatDialogModule,
        MatTabsModule,
        MatTooltipModule,
        MatDividerModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
    ],
    entryComponents: [
        TransactionDetailComponent
    ],
    providers: [
        MatNativeDateModule,
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
        {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl},
    ],
})
export class MaterialModule {
}
