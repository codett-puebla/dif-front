import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DepartureModel} from '../../../../../models/departure.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from "sweetalert2";
import {TransactionDetailComponent} from '../../../../shared/dialogs/transaction-detail/transaction-detail.component';
import {UserService} from '../../../../../services/user/user.service';
import {MatDialog} from '@angular/material';
import {UserInterfaceModel} from '../../../../../models/user.model';
import {DeparturesService} from '../../../../../services/departures/departures.service';
import MessagesUtill from '../../../../../util/messages.utill';
import PermissionUtil from '../../../../../util/permission.util';
import {ADMIN} from '../../../../../util/const.util';

@Component({
    selector: 'app-departure-data-table',
    templateUrl: './departure-data-table.component.html',
    styleUrls: ['./departure-data-table.component.css']
})
export class DepartureDataTableComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'series', 'folio', 'date', 'warehouse', 'staff', 'user', 'actions'];
    dataSource: MatTableDataSource<DepartureModel>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    @Input() stateButton: boolean;
    @Output() stateButtonChange = new EventEmitter();

    private users: UserInterfaceModel[];

    constructor(
        private _departure: DeparturesService,
        private _user: UserService,
        public dialog: MatDialog
    ) {
        this._user.getData(this.setUsersCallback.bind(this));
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

    deleteDeparture(id: any) {
        console.log('ELIMINADO --> ', id);
        MessagesUtill.deleteMessage(id, this.callbackDeleted.bind(this));
    }


    private callbackDeleted(id: number) {
        this._departure.deletedDeparture(id).subscribe(
            response => this.setDataSource(true),
            error => console.log(error)
        );
    }


    setDataSource(refresh = false) {
        Swal.showLoading();
        this._departure.getData(this.callbackSetDataSource.bind(this), refresh);
    }

    private callbackSetDataSource(data: any, error = false) {
        console.log('DATA CARNAL :V --> ', data);
        this.dataSource.data = data;
        if (!error) {
            Swal.close();
        }
    }

    getNameUser(idUser) {
        for (let user of this.users) {
            if (user.id === idUser) {
                return user.username;
            }
        }
        return idUser;
    }

    setUsersCallback(users: any) {
        this.users = users;
    }

    openDialog(element: any): void {
        element.departureDetails.title = 'Detalle de salida';
        element.departureDetails.type = 'salida';
        const dialogRef = this.dialog.open(TransactionDetailComponent, {
            width: '50%',
            data: element.departureDetails
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    getPermission(): boolean {
        return PermissionUtil.getPermission(ADMIN);
    }
}
