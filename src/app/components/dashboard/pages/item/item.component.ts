import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ItemModel} from '../../../../models/item.model';
import {WarehouseService} from '../../../../services/warehouse/warehouse.service';
import {ItemService} from '../../../../services/item/item.service';
import MessagesUtill from '../../../../util/messages.utill';

import Swal from 'sweetalert2';
import {DataTableComponent} from './data-table/data-table.component';
import * as _ from 'lodash';


const ITEM_ACTIVE = 1;

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})


export class ItemComponent implements OnInit {
    newItem: ItemModel;
    panelOpenState = false;
    form: FormGroup;
    editForm = false;
    warehouse: any;
    warehouses: any[] = [];
    @ViewChild(DataTableComponent, { static: false })
    dataTable: DataTableComponent;
    dataEditForm: ItemModel;


    constructor(
        private _warehouse: WarehouseService,
        private _item: ItemService
    ) {
        this.editForm = false;
        this.form = new FormGroup(
            {
                code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
                description: new FormControl('', [Validators.required, Validators.maxLength(60)]),
                image: new FormControl('', []),
                line: new FormControl('', [Validators.required, Validators.maxLength(30)]),
                purchaseAmount: new FormControl('', [Validators.required]),
                saleAmount: new FormControl('', [Validators.required]),
                trademark: new FormControl('', [Validators.required]),
                unitMeasurePurchase: new FormControl('', [Validators.required]),
                unitMeasureSale: new FormControl('', [Validators.required]),
                billable: new FormControl('', []),
                storable: new FormControl('', []),
                quantity: new FormControl('', [Validators.required]),
                warehouse: new FormControl('', [Validators.required]),
            }
        );
        this.setDataWarehouse();
    }

    ngOnInit() {
    }

    submit() {
        Swal.showLoading();
        let values = this.form.value;

        let data = {
            id: null,
            code: values.code,
            description: values.description,
            unitMeasureSale: values.unitMeasureSale,
            unitMeasurePurchase: values.unitMeasurePurchase,
            image: null,
            line: values.line,
            trademark: values.trademark,
            billable: values.billable,
            storable: values.storable,
            purchaseAmount: values.purchaseAmount,
            saleAmount: values.saleAmount,
            status: ITEM_ACTIVE,
            inventories: [{
                id: null,
                quantity: values.quantity,
                status: ITEM_ACTIVE,
                warehouse: {
                    id: 0

                }
            }]
        };

        if (!this.editForm) {
            data.inventories[0].warehouse.id = values.warehouse.id;
            this._item.newItem(data).subscribe(
                response => {
                    this.panelOpenState = false;
                    this.form.reset();
                    this.dataTable.getItems();
                    Swal.close();
                    MessagesUtill.successMessage('Éxito', 'Nuevo registro');
                },
                error => {
                    Swal.close();
                    MessagesUtill.errorMessage('El servicio no esta disponible');
                },
            );
        } else {
            data.id = this.dataEditForm.id;
            if (!_.isEmpty(this.dataEditForm.inventories)) {
                data.inventories = [];
            }
            console.log(JSON.stringify(data));
            this._item.editItem(data).subscribe(
                response => {
                    this.dataTable.getItems();
                    this.panelOpenState = false;
                    this.form.reset();
                    Swal.close();
                    MessagesUtill.successMessage('Éxito', 'Se actualizo con éxito');
                },
                error => MessagesUtill.errorMessage('El servicio no se encuentra disponible')
            );

        }

    }

    getAttrMessage(attr: string) {
        const abstractControl = this.form.get(attr);
        return abstractControl.hasError('required') ? '* Requerido' :
            abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
                abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                    '';
    }

    setDataWarehouse() {
        this._warehouse.getAllWarehpuse().subscribe(
            response => this.formatDataSelect(response),
            error => MessagesUtill.errorMessage('El servicio no se encuentra disponible'),
        );
    }

    formatDataSelect(warehouse) {
        this.warehouses = warehouse;
    }

    setStatusOpenState(status: boolean) {
        if (!status) {
            this.form.reset();
            this.editForm = false;
        }
    }

    editItem(event: ItemModel) {
        this.dataEditForm = event;
        this.form.get('code').setValue(event.code);
        this.form.get('description').setValue(event.description);
        this.form.get('image').setValue(event.image);
        this.form.get('line').setValue(event.line);
        this.form.get('purchaseAmount').setValue(event.purchaseAmount);
        this.form.get('saleAmount').setValue(event.saleAmount);
        this.form.get('trademark').setValue(event.trademark);
        this.form.get('unitMeasurePurchase').setValue(event.unitMeasurePurchase);
        this.form.get('unitMeasureSale').setValue(event.unitMeasureSale);
        this.form.get('billable').setValue(event.billable);
        this.form.get('storable').setValue(event.storable);
        if (!_.isEmpty(event.inventories[0])) {
            this.form.get('quantity').setValue(event.inventories[0].quantity);
            const selected = this.warehouses.find(x => x.id === event.inventories[0].warehouse.id);
            this.form.get('warehouse').setValue(selected);
        } else {
            this.form.get('quantity').setValue(0);
        }
        this.form.get('quantity').disable();
        this.form.get('warehouse').disable();
        this.panelOpenState = true;
        this.editForm = true;
    }
}
