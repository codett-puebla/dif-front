import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})


/*
{
	"tinyint" : "billable",
	"string" : "code",
	"string1" : "description",
	"string2" : "image",
	"string3" : "line",
	"int1" : "purchaseAmount",
	"int2" : "saleAmount",
	"int3" : "status",
	"int4" : "storable",
	"string4" : "trademark",
	"int5" : "unitMeasurePurchase",
	"int6" : "u
 */

export class ItemComponent implements OnInit {
    newItem: FormGroup;

    panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

    submit() {
        console.log('NEW ITEM ---> ', this.newItem);
    }

}
