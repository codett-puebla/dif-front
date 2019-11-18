import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DepartureModel} from '../../../../../models/departure.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

const ELEMENT_DATA: DepartureModel[] = [
    {
        date: new Date(),
        folio: '222222',
        id: 1,
        idStaff: 1,
        series: 'V',
        idWarehouse: 2,
        status: 1,
    }, {
        date: new Date(),
        folio: '333333',
        id: 2,
        idStaff: 1,
        series: 'X',
        idWarehouse: 2,
        status: 1,
    },
];


@Component({
    selector: 'app-departure-data-table',
    templateUrl: './departure-data-table.component.html',
    styleUrls: ['./departure-data-table.component.css']
})
export class DepartureDataTableComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'series', 'folio', 'date', 'idWarehouse', 'idStaff', 'status', 'actions'];
    dataSource: MatTableDataSource<DepartureModel>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    @Input() stateButton: boolean;
    @Output() stateButtonChange = new EventEmitter();

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

    editDeparture(element: any) {

    }

    deleteDeparture(id: any) {

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
