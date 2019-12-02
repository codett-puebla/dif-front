import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseModel} from './../../../../models/warehouse.model';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {WarehouseService} from '../../../../services/warehouse/warehouse.service';
import MessagesUtill from '../../../../util/messages.utill';
import {WarehouseDataTableComponent} from './warehouse-data-table/warehouse-data-table.component';

import Swal from 'sweetalert2';


@Component({
    selector: 'app-warehouse',
    templateUrl: './warehouse.component.html',
    styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit, AfterViewInit {

    @ViewChild(WarehouseDataTableComponent, { static: false })
    dataTable: WarehouseDataTableComponent;

    warehouse: WarehouseModel;
    panelOpenState = false;
    form: FormGroup;
    editForm = false;
    newWarehouse = false;
    dataEditWarehouse: WarehouseModel;
    tittle = 'Bodegas';
    icon = 'fa-home';

    constructor(
        private _warehouse: WarehouseService
    ) {
        this.warehouse = new WarehouseModel();
        this.editForm = false;
        this.form = new FormGroup(
            {
                accountingAccount: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                reason: new FormControl('', [Validators.required, Validators.minLength(10)]),
            }
        );
    }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
    }

    submit() {
        Swal.showLoading();
        let data = this.form.value;
        data.status = 1;

        if (this.editForm) {
            data.id = this.dataEditWarehouse.id;
            this._warehouse.editWarehouse(data).subscribe(
                response => {
                    this.dataTable.setDataSource(true);
                    this.editForm = false;
                    this.panelOpenState = false;
                    Swal.close();
                    MessagesUtill.successMessage('Éxito', 'Registro actualizado');
                },
                error => {
                    Swal.close();
                    MessagesUtill.errorMessage('El servicio no esta disponible');
                }
            );
        } else {
            this._warehouse.newWarehouse(data).subscribe(
                response => this.successRegisterWareHouse(),
                error => {
                    Swal.close();
                    MessagesUtill.errorMessage('El servicio no esta disponible en este momento');
                },
            );
        }
    }

    successRegisterWareHouse() {
        Swal.close();
        MessagesUtill.successMessage('Éxito', 'Nuevo registro');
        this.form.reset();
        this.panelOpenState = false;
        this.newWarehouse = true;
        this.dataTable.setDataSource(true);
    }

    getAttrMessage(attr: string) {
        const abstractControl = this.form.get(attr);
        return abstractControl.hasError('required') ? '* Requerido' :
            abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
                abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                    '';
    }

    editWarehouse(event: WarehouseModel) {
        this.panelOpenState = true;
        this.form.get('name').setValue(event.name);
        this.form.get('address').setValue(event.address);
        this.form.get('reason').setValue(event.reason);
        this.form.get('accountingAccount').setValue(event.accountingAccount);
        this.editForm = true;
        this.dataEditWarehouse = event;
    }

    setStatusOpenState(status: boolean) {
        if (!status) {
            this.form.reset();
            this.editForm = false;
        }
    }
}
