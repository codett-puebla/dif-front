import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InventoryModel} from '../../../../../models/inventory.model';
import {InventoryService} from '../../../../../services/inventory/inventory.service';
import MessagesUtill from '../../../../../util/messages.utill';

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

    constructor(
        private _inventory: InventoryService
    ) {
      this.getAllInventory();
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
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

    getAllInventory() {
      this._inventory.getAllInventory().subscribe(
          reponse =>this.setDataSource(reponse),
          error => MessagesUtill.errorMessage('El servicio no esta disponible')
      );
    }

    setDataSource(data: any) {
        console.log('DATA --> ', data);
        this.dataSource.data = data;
    }
}
