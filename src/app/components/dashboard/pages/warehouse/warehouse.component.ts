import { Component, OnInit } from '@angular/core';
import {WarehouseModel} from './../../../../models/warehouse.model';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouse: WarehouseModel;
  panelOpenState = false;
  form: FormGroup;
  constructor() {
    this.warehouse = new WarehouseModel();

    this.form = new FormGroup(
        {
          accountingAccount: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
          name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
          address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
          reason: new FormControl('', [Validators.required, Validators.minLength(10)]),
        }
    );
  }

  ngOnInit() {

  }

  submit() {
    console.log('NEW  warehouse---> ', this.form);
  }

  getAttrMessage(attr: string) {
    const abstractControl = this.form.get(attr);
    return abstractControl.hasError('required') ? '* Requerido' :
        abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
            abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                '';
  }
}
