import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ClientModel} from '../../../../../models/client.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ClientService} from '../../../../../services/client/client.service';
import Swal from 'sweetalert2';
import MessagesUtill from '../../../../../util/messages.utill';

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

    @Output() editClientEmitter: EventEmitter<any>;

    constructor(
        private _client: ClientService
    ) {
        this.editClientEmitter = new EventEmitter<any>();
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.setDataSource();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.editClientEmitter.emit(element);
    }

    deleteClient(id: any) {
        MessagesUtill.deleteMessage(id, this.callbackDeleted.bind(this));
    }

    private callbackDeleted(id: number) {
        this._client.deletedClient(id).subscribe(
            response => this.setDataSource(true),
            error => console.log(error)
        );
    }


    setDataSource(refresh = false) {
        Swal.showLoading();
        this._client.getData(this.callbackSetDataSource.bind(this), refresh);
    }

    private callbackSetDataSource(data: any, error = false) {
        console.log('DATA CARNAL :V --> ', data);
        this.dataSource.data = data;
        if (!error) {
            Swal.close();
        }
    }
}
