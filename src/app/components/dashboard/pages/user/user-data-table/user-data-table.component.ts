import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserInterfaceModel} from '../../../../../models/user.model';


const ELEMENT_DATA: UserInterfaceModel[] = [
      {
        id: 0,
        username: 'Alex@algo.com',
        password: 'hola',
        status: 1,
        create_at: '10-10-10 10:10:10',
      },
      {
        id: 1,
        username: 'Alex@algo.com',
        password: 'hola',
        status: 2,
        create_at: '10-10-10 10:10:10',
      },
    ]
;



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

  constructor() { }

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
