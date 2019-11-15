import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ItemInterface} from '../../../../../models/item.model';


const ELEMENT_DATA: ItemInterface[] = [
    {
        id: 1,
        code: 'Hydrogen',
        description: 'ejemplo',
        image: 'ejemplo',
        line: 'ejemplo',
        purchaseAmount: 10,
        saleAmount: 11,
        trademark: 'xbox',
        unitMeasurePurchase: 0,
        unitMeasureSale: 12,
        billable: false
    },
    {
        id: 2,
        code: 'Helium',
        description: 'ejemplo',
        image: 'ejemplo',
        line: 'ejemplo',
        purchaseAmount: 10,
        saleAmount: 11,
        trademark: 'xbox',
        unitMeasurePurchase: 0,
        unitMeasureSale: 12,
        billable: false
    },
    {
        id: 3,
        code: 'Lithium',
        description: 'ejemplo',
        image: 'ejemplo',
        line: 'test',
        purchaseAmount: 10,
        saleAmount: 11,
        trademark: 'xbox',
        unitMeasurePurchase: 0,
        unitMeasureSale: 12,
        billable: false
    },
];

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {
    displayedColumns: string[] = ['id', 'code', 'description', 'image', 'line', 'purchaseAmount', 'saleAmount', 'trademark', 'unitMeasurePurchase', 'unitMeasureSale'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor() {
    }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
