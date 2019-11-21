import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {WarehouseInterfaceModel} from '../../../../../models/warehouse.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {WarehouseService} from '../../../../../services/warehouse/warehouse.service';
import MessagesUtill from '../../../../../util/messages.utill';
import {from, Observable} from 'rxjs';

@Component({
    selector: 'app-warehouse-data-table',
    templateUrl: './warehouse-data-table.component.html',
    styleUrls: ['./warehouse-data-table.component.css']
})
export class WarehouseDataTableComponent implements OnInit, AfterViewInit {

    @Input() stateButton: boolean;
    @Output() stateButtonChange = new EventEmitter();

    @Input() newWareHouse: boolean;
    @Output() newWareHouseChange: EventEmitter<any>;

    displayedColumns: string[] = ['id', 'address', 'name', 'reason', 'accountingAccount', 'actions'];
    dataSource: MatTableDataSource<WarehouseInterfaceModel>;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;


    constructor(
        private _warehouse: WarehouseService
    ) {
        this.dataSource = new MatTableDataSource();
        this.getContentDataTable();
        this.newWareHouseChange = new EventEmitter<any>();
    }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAccordion() {
        this.stateButtonChange.emit(!this.stateButton);
    }

    getAction(): string {
        return !this.stateButton ? 'Añadir' : 'Cancelar';
    }

    editWarehouse(element: any) {
        this.newWareHouseChange.emit(element);
    }

    deleteWarehouse(id: number) {
        MessagesUtill.deleteMessage(id,this.callbackDeleted.bind(this));
    }

    private callbackDeleted(id: number) {
        this._warehouse.deletedWarehouse(id).subscribe(
            response => this.getContentDataTable(),
            error => console.log(error)
        );
    }

    ngAfterViewInit(): void {
        console.log(this.paginator);
        console.log(this.sort);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getContentDataTable() {
        this._warehouse.getAllWarehpuse().subscribe(
            response => this.setContentDataTable(response),
        );
    }

    setContentDataTable(data: any) {
        this.dataSource.data = data;
    }

}
