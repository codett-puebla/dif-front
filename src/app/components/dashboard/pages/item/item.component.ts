import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ItemModel} from '../../../../models/item.model';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})


export class ItemComponent implements OnInit {
    newItem: ItemModel = new ItemModel();
    panelOpenState = false;

  constructor() {
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
      console.log('NEW ITEM ---> ', form);
  }

}
