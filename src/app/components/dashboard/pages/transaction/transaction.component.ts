import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InventoryModel} from '../../../../models/inventory.model';
import Swal from 'sweetalert2';
import {TransactionService} from '../../../../services/transaction/transaction.service';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

    displayedColumns: string[] = ['id', 'reason', 'item', 'code', 'quantity', 'warehouse', 'user'];
    dataSource: MatTableDataSource<InventoryModel>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    tittle = 'Historial';
    icon = 'fa-history';

    constructor(
        private _transaction: TransactionService
    ) {
    }

    ngOnInit() {
        Swal.showLoading();
        this.dataSource = new MatTableDataSource();
        this._transaction.getData(this.setDataSource.bind(this));
    }

    setDataSource(data: any, error = false) {
        console.log('DATA --> ', data);
        this.dataSource.data = data;
        if (!error) {
            Swal.close();
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
