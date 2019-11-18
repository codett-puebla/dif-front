import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EntryModel} from '../../../../../models/entry.model';

const ELEMENT_DATA: EntryModel[] = [
        {
            date: new Date(),
            folio: '123123',
            id: 1,
            idUser: 2,
            idWarehouse: 2,
            series: 'V-1123123',
            status: 1,
        },
        {
            date: new Date(),
            folio: '1234444',
            id: 3,
            idUser: 2,
            idWarehouse: 2,
            series: 'X-1123123',
            status: 1,
        },
    ]
;


@Component({
    selector: 'app-entry-data-table',
    templateUrl: './entry-data-table.component.html',
    styleUrls: ['./entry-data-table.component.css']
})
export class EntryDataTableComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['id', 'series', 'folio', 'date', 'idWarehouse', 'status', 'actions'];
    dataSource: MatTableDataSource<EntryModel>;
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

    editEntry(element: any) {

    }

    deleteEntry(id: any) {

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
