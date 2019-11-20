import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
  panelOpenState = false;
  form: FormGroup;

  warehouse: any[] = [
    {value: '1', viewValue: 'Bodega1'},
    {value: '2', viewValue: 'Bodega2'},
  ];

  item: any[] = [
    {value: '1', viewValue: 'Item1'},
    {value: '2', viewValue: 'Item2'},
  ];

  constructor() {
    this.form = new FormGroup(
        {
          idWarehouse: new FormControl('', [Validators.required]),
          idItem: new FormControl('', [Validators.required]),
          quantity: new FormControl('', [Validators.required, Validators.minLength(1)])
        }
    );
  }

  ngOnInit() {
  }

  submit() {
    console.log('NEW CLIENT ---> ', this.form);
  }

  getAttrMessage(attr: string) {
    const abstractControl = this.form.get(attr);
    return abstractControl.hasError('required') ? '* Requerido' :
        abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
            abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                '';
  }
}
