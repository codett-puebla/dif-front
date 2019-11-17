import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ClientModel} from '../../../../../models/client.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

const ELEMENT_DATA: ClientModel[] = [
        {
            address: 'asdasdasd',
            email: 'asasdasd',
            id: 1,
            name: 'asdasd',
            phone: '123123@',
            rfc: 'asfdasdasd',
            status: 1,
            useCFID: 'asdasd',
        }, {
            address: 'asdasdasd',
            email: 'asasdasd',
            id: 2,
            name: 'aaaaaa',
            phone: '123123',
            rfc: 'asfdasdasd',
            status: 1,
            useCFID: 'asdasd',
        },
    ]
;

@Component({
    selector: 'app-client-data-table',
    templateUrl: './client-data-table.component.html',
    styleUrls: ['./client-data-table.component.css']
})
export class ClientDataTableComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['id', 'name', 'address', 'email', 'rfc', 'useCFID', 'phone', 'status', 'actions'];
    dataSource: MatTableDataSource<ClientModel>;
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
