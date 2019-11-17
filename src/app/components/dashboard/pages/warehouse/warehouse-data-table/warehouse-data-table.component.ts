import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {WarehouseInterfaceModel} from '../../../../../models/warehouse.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

const ELEMENT_DATA: WarehouseInterfaceModel[] = [
        {
            id: 1,
            accountingAccount: 1132,
            address: 'asdasdasd',
            name: 'asdasd',
            reason: 'ninguna',
            status: 1,
        }, {
            id: 2,
            accountingAccount: 1134,
            address: 'asdasdasd',
            name: 'aaaaaa',
            reason: 'ninguna',
            status: 1,
        },
    ]
;

@Component({
    selector: 'app-warehouse-data-table',
    templateUrl: './warehouse-data-table.component.html',
    styleUrls: ['./warehouse-data-table.component.css']
})
export class WarehouseDataTableComponent implements OnInit, AfterViewInit {

    @Input() stateButton: boolean;
    @Output() stateButtonChange = new EventEmitter();
    displayedColumns: string[] = ['id', 'address', 'name', 'reason', 'accountingAccount', 'actions'];
    dataSource: MatTableDataSource<WarehouseInterfaceModel>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor() {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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

    editClient(element: any) {

    }

    deleteClient(id: any) {

    }

    ngAfterViewInit(): void {
        console.log(this.paginator);
        console.log(this.sort);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
