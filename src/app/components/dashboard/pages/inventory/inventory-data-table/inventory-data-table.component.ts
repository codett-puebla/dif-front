import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InventoryModel} from '../../../../../models/inventory.model';

const ELEMENT_DATA: InventoryModel[] = [
      {
        id: 1,
        quantity: 10,
        idItem: 1,
        idWarehouse: 1,
        status: 1,
      },
      {
        id: 2,
        quantity: 12,
        idItem: 2,
        idWarehouse: 2,
        status: 1,
      },
    ];

@Component({
  selector: 'app-inventory-data-table',
  templateUrl: './inventory-data-table.component.html',
  styleUrls: ['./inventory-data-table.component.css']
})

export class InventoryDataTableComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['id', 'idWarehouse', 'idItem', 'quantity', 'actions'];
  dataSource: MatTableDataSource<InventoryModel>;
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
