import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {DepartureDataTableComponent} from './departure-data-table/departure-data-table.component';
import {Observable} from 'rxjs';
import {WarehouseService} from '../../../../services/warehouse/warehouse.service';
import {ItemService} from '../../../../services/item/item.service';
import {InventoryService} from '../../../../services/inventory/inventory.service';
import {DeparturesService} from '../../../../services/departures/departures.service';
import {map, startWith} from 'rxjs/operators';
import MessagesUtill from '../../../../util/messages.utill';
import * as _ from 'lodash';
import Swal from "sweetalert2";
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-departure',
    templateUrl: './departure.component.html',
    styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit {
    panelOpenState = true;
    form: FormGroup;
    items: any;
    itemsSelect: any;

    @ViewChild(DepartureDataTableComponent, {static: false})
    dataTable: DepartureDataTableComponent;

    editForm = false;
    warehouses: any[] = [];
    filteredOptions: Observable<string[]>[] = [];
    entryTotal = 0;

    constructor(
        private _departure: DeparturesService,
        private _warehouse: WarehouseService,
        private _item: ItemService,
        private _inventory: InventoryService
    ) {
        this.form = new FormGroup(
            {
                series: new FormControl('', [Validators.required, Validators.minLength(4)]),
                folio: new FormControl('', [Validators.required, Validators.minLength(4)]),
                date: new FormControl(formatDate(new Date(),'yyyy/MM/dd','en')),
                warehouse: new FormControl('', [Validators.required]),
                staff: new FormControl('', [Validators.required]),
                departureDetails: new FormArray(
                    [
                        new FormGroup({
                            item: new FormControl('',[Validators.required]),
                            quantity: new FormControl('', [Validators.required, Validators.minLength(1)])
                        })
                    ]
                )
            }
        );

        this._warehouse.getData(this.callbackSetDataWareHouseSelect.bind(this));
        this._item.getData(this.callbackSetDataItems.bind(this));
        this.form.get('date').disable();
    }

    ngOnInit() {
    }

  submit() {
      Swal.showLoading();
      let data = this.form.value;
      if (!this.editForm) {
          data.id = null;
          data.idUser = 1;
          data.status = 1;
          data.departureStatus = 1;
          console.log('NEW CLIENT ---> ', data);
          this._departure.newDeparture(data).subscribe(
              response => this.successRegister('Registro éxitoso'),
              error => {
                  Swal.close();
                  MessagesUtill.errorMessage('El servicio no esta disponible');
                  console.log(error);
              }
          );
      }
    }

    setStatusOpenState(status: boolean) {
        if (!status) {
            this.form.reset();
            this.editForm = false;
        }
    }

    successRegister(message: string) {
        this._inventory.updateData();
        this.dataTable.setDataSource(true);
        MessagesUtill.successMessage('Éxito', message);
        this.form.reset();
        this.panelOpenState = false;
        this.editForm = false;
    }

    callbackSetDataWareHouseSelect(warehouse) {
        this.warehouses = warehouse;
    }

    callbackSetDataItems(items) {
        this.items = items;
    }

    onChangeItem() {
        const warehouse = this.form.get('warehouse');
        this.itemsSelect = this.items.filter(x => {
            if (! _.isEmpty(x.inventories)) {
                console.log(x.inventories[0].warehouse.id, warehouse.value.id);
                if (x.inventories[0].warehouse.id === warehouse.value.id) {
                    return x;
                }
            }
        });
    }

    deleteEntryDetail(i: number) {
        // @ts-ignore
        if (this.form.get('departureDetails').controls.length > 1) {
            console.log('eliminando');
            (this.form.controls.departureDetails as FormArray).removeAt(i);
            this.filteredOptions.splice(i, 1);
        }
    }

    manageArrayCostControl(index: number) {
        const arrayControl = this.form.get('departureDetails') as FormArray;
        // @ts-ignore
        this.filteredOptions[index] = arrayControl.at(index).controls.item.valueChanges
            .pipe(
                startWith(''),
                map((value: any) => {
                    console.log('FILTRO ---> ', value);
                    return this._filter(value);
                })
            );
        arrayControl.at(index).valueChanges.subscribe(
            () => {
                this.controlEntriesDetail(true);
            }
        );
    }

    controlEntriesDetail(isSum: boolean) {
        if (isSum) {
            this.entryTotal += 1;
        } else {
            this.entryTotal -= 1;
        }
    }

    // metodo de filtrado
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.items.filter(option => option.toLowerCase().includes(filterValue));
    }

    addEntryDetail() {
        (this.form.controls.departureDetails as FormArray).push(
            new FormGroup({
                item: new FormControl('',[Validators.required]),
                quantity: new FormControl('', [Validators.required, Validators.minLength(1)])
            })
        );
        // @ts-ignore
        this.manageArrayCostControl(this.form.controls.departureDetails.controls.length - 1);
    }


    getAttrMessage(attr: string
    ) {
        const abstractControl = this.form.get(attr);
        return abstractControl.hasError('required') ? '* Requerido' :
            abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
                abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                    '';
    }
}
