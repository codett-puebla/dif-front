import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EntryModel} from '../../../../../models/entry.model';
import Swal from "sweetalert2";
import {EntryService} from '../../../../../services/entry/entry.service';
import MessagesUtill from '../../../../../util/messages.utill';
import {UserService} from '../../../../../services/user/user.service';
import {UserInterfaceModel} from '../../../../../models/user.model';
import {TransactionDetailComponent} from '../../../../shared/dialogs/transaction-detail/transaction-detail.component';
import {MatDialog} from '@angular/material';
import PermissionUtil from '../../../../../util/permission.util';
import {ADMIN} from '../../../../../util/const.util';

@Component({
    selector: 'app-entry-data-table',
    templateUrl: './entry-data-table.component.html',
    styleUrls: ['./entry-data-table.component.css']
})
export class EntryDataTableComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['id', 'series', 'folio', 'date', 'idWarehouse', 'idUser', 'actions'];
    dataSource: MatTableDataSource<EntryModel>;
    private users: UserInterfaceModel[];

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    @Input() stateButton: boolean;
    @Output() stateButtonChange = new EventEmitter();
    @Output() editEntryEmitter: EventEmitter<any>;


    constructor(
        private _entry: EntryService,
        private _user: UserService,
        public dialog: MatDialog
    ) {
        this._user.getData(this.setUsersCallback.bind(this));
        this.editEntryEmitter = new EventEmitter<any>();

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

    editEntry(element: any) {
        this.editEntryEmitter.emit(element);
    }

    deleteEntry(id: any) {
        MessagesUtill.deleteMessage(id, this.callbackDeleted.bind(this));
    }

    detailEntry(element: any) {
        console.log('DETALLE --> ', element);
    }

    private callbackDeleted(id: number) {
        this._entry.deletedEntry(id).subscribe(
            response => this.setDataSource(true),
            error => console.log(error)
        );
    }


    setDataSource(refresh = false) {
        Swal.showLoading();
        this._entry.getData(this.callbackSetDataSource.bind(this), refresh);
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
        element.entryDetails.title = 'Detalle de entrada';
        element.entryDetails.type = 'entrada';
        const dialogRef = this.dialog.open(TransactionDetailComponent, {
            width: '50%',
            data: element.entryDetails
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    getPermission(): boolean {
        return PermissionUtil.getPermission(ADMIN);
    }
}
