import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSelectModule,
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
import { ItemComponent } from './item/item.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    DomseguroPipe,
    ItemComponent,
  ],
  exports: [
    DomseguroPipe,
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
  ],
  entryComponents: [
  ]
})
export class MaterialModule {
}
