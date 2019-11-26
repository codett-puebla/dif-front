import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ItemModel} from '../../../../../models/item.model';
import {MatPaginator, MatSort} from '@angular/material';
import {ItemService} from '../../../../../services/item/item.service';
import Swal from 'sweetalert2';
import MessagesUtill from '../../../../../util/messages.utill';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['id', 'code', 'trademark', 'line', 'purchaseAmount', 'saleAmount', 'unitMeasurePurchase', 'unitMeasureSale', 'description', 'actions'];
    dataSource: MatTableDataSource<ItemModel>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @Input() stateButton: boolean;
    @Output() stateButtonChange = new EventEmitter();

    @Output() editItemEmitter: EventEmitter<any>;
    @Input() newItem: boolean;

    constructor(
        private _itemService: ItemService,
    ) {
        this.editItemEmitter = new EventEmitter<any>();
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

    editItem(element: any) {
        this.editItemEmitter.emit(element);
    }

    deleteItem(id: any) {
        MessagesUtill.deleteMessage(id, this.callbackDeleted.bind(this));
    }

    private callbackDeleted(id: number) {
        this._itemService.deleteItem(id).subscribe(
            response => this.setDataSource(true),
            error => console.log(error)
        );
    }

    setDataSource(refresh = false) {
        this._itemService.getData(this.callbackSetDataSource.bind(this), refresh);
    }

    callbackSetDataSource(item) {
        console.log('DATA ---> ', item);
        this.dataSource.data = item;
    }
}
