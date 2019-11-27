import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserInterfaceModel} from '../../../../../models/user.model';
import {UserService} from '../../../../../services/user/user.service';
import Swal from "sweetalert2";
import MessagesUtill from '../../../../../util/messages.utill';

@Component({
  selector: 'app-user-data-table',
  templateUrl: './user-data-table.component.html',
  styleUrls: ['./user-data-table.component.css']
})
export class UserDataTableComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['id', 'username', 'status', 'create_at', 'actions'];
  dataSource: MatTableDataSource<UserInterfaceModel>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @Input() stateButton: boolean;
  @Output() stateButtonChange = new EventEmitter();
  @Output() editUserEmitter: EventEmitter<any>;
  constructor(
      private _user: UserService
  ) {
    this.editUserEmitter = new EventEmitter<any>();
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
    this.editUserEmitter.emit(element);
  }

  deleteClient(id: any) {
    MessagesUtill.deleteMessage(id, this.callbackDeleted.bind(this));
  }

  private callbackDeleted(id: number) {
    this._user.deletedUser(id).subscribe(
        response => this.setDataSource(true),
        error => console.log(error)
    );
  }

  setDataSource(refresh = false) {
    Swal.showLoading();
    this._user.getData(this.callbackSetDataSource.bind(this), refresh);
  }

  private callbackSetDataSource(data: any, error = false) {
    console.log('DATA CARNAL :V --> ', data);
    this.dataSource.data = data;
    if (!error) {
      Swal.close();
    }
  }

}
