import { Component, OnInit } from '@angular/core';
import {WarehouseModel} from './../../../../models/warehouse.model';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouse: WarehouseModel;
  panelOpenState = false;

  constructor() {
    this.warehouse = new WarehouseModel();
  }

  ngOnInit() {

  }

  submit(form: NgForm) {
    console.log('NEW  warehouse---> ', form);
  }

}
