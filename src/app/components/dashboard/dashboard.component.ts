import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {WarehouseService} from '../../services/warehouse/warehouse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  toggle: boolean;

  constructor(
      private _item: ItemService,
      private _warehouse: WarehouseService,
  ) { }

  ngOnInit() {
  }


  changeToggle(toggle) {
    this.toggle = toggle;
  }

}
