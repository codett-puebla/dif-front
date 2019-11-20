import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ItemModel} from '../../../../models/item.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})


export class ItemComponent implements OnInit {
    newItem: ItemModel;
    panelOpenState = false;

    constructor() {
        this.newItem = new ItemModel();
    }

    ngOnInit() {
    }

    submit(form: NgForm) {
        console.log('FORM ITEM --> ', form);
    }
}
