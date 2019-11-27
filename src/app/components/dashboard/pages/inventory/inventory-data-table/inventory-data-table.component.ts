import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InventoryModel} from '../../../../../models/inventory.model';
import {InventoryService} from '../../../../../services/inventory/inventory.service';
import MessagesUtill from '../../../../../util/messages.utill';
import {WarehouseService} from '../../../../../services/warehouse/warehouse.service';
import {ItemService} from '../../../../../services/item/item.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-inventory-data-table',
    templateUrl: './inventory-data-table.component.html',
    styleUrls: ['./inventory-data-table.component.css']
})

export class InventoryDataTableComponent implements OnInit, AfterViewInit {

    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['id', 'item', 'quantity', 'warehouse'];
    dataSource: MatTableDataSource<InventoryModel>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    @Input() stateButton: boolean;
    @Output() stateButtonChange = new EventEmitter();

    @Output() editInventoryEmitter: EventEmitter<any>;
    constructor(
        private _inventory: InventoryService
    ) {
      this.editInventoryEmitter = new EventEmitter<any>();
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        Swal.showLoading();
        this._inventory.getData(this.setDataSource.bind(this));
    }

    ngAfterViewInit(): void {
        console.log(this.paginator);
        console.log(this.sort);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    setDataSource(data: any, error = false) {
        console.log('DATA --> ', data);
        this.dataSource.data = data;
        if (!error) {
            Swal.close();
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // openAccordion() {
    //     this.stateButtonChange.emit(!this.stateButton);
    // }
    //
    // getAction(): string {
    //     return !this.stateButton ? 'Añadir' : 'Cancelar';
    // }

    // editInventory(element: any) {
    //     console.log('SE EDITA PAPU --> ', element);
    //     this.editInventoryEmitter.emit(element);
    // }
    //
    // deleteInventory(id: any) {
    //     console.log('SE BORRA PAPU --> ', id);
    //     MessagesUtill.deleteMessage(id, this.callbackDeleted.bind(this));
    // }

    // private callbackDeleted(id: number) {
    //     this._inventory.deleteInventory(id).subscribe(
    //         response => this.getAllInventory(),
    //         error => console.log(error)
    //     );
    // }
}
