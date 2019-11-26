import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {InventoryModel} from '../../../../models/inventory.model';
import {InventoryDataTableComponent} from './inventory-data-table/inventory-data-table.component';
import {WarehouseService} from '../../../../services/warehouse/warehouse.service';
import {ItemService} from '../../../../services/item/item.service';
import {ItemModel} from '../../../../models/item.model';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
    panelOpenState = false;
    form: FormGroup;
    editForm: boolean;
    @ViewChild(InventoryDataTableComponent, {static: false})
    datatable: InventoryDataTableComponent;
    warehouses: any[] = [];
    items: any[] = [];

    constructor(
        // private _warehouse: WarehouseService,
        // private _item: ItemService
    ) {
        // this.form = new FormGroup(
        //     {
        //         warehouse: new FormControl('', [Validators.required]),
        //         item: new FormControl('', [Validators.required]),
        //         quantity: new FormControl('', [Validators.required, Validators.minLength(1)])
        //     }
        // );
        // this.editForm = false;
        // this._item.getData(this.setContentItemSelected.bind(this));
        // this._warehouse.getData(this.setContentWarehouseSelected.bind(this));
    }

    ngOnInit() {
    }

    getAttrMessage(attr: string) {
        const abstractControl = this.form.get(attr);
        return abstractControl.hasError('required') ? '* Requerido' :
            abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
                abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                    '';
    }

    setStatusOpenState(status: boolean) {
        if (!status) {
            this.form.reset();
            this.editForm = false;
        }
    }

    editInventory(event: InventoryModel) {
        this.form.get('quantity').setValue(event.quantity);
        this.editForm = true;
        this.panelOpenState = true;
    }

    setContentItemSelected(data) {
      console.log('SI FUNCA WE -->', data);
        this.items = data;
    }

  setContentWarehouseSelected(data) {
    console.log('SI FUNCA WE -->', data);
    this.warehouses = data;
  }
}
