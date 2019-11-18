import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-departure',
    templateUrl: './departure.component.html',
    styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit {
    panelOpenState = false;
    form: FormGroup;
    items = ['Sillas', 'Mesas', 'Banquitos'];

    constructor() {
        this.form = new FormGroup(
            {
                series: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                folio: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                date: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                idWarehouse: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                idStaff: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            }
        );
    }

    ngOnInit() {
    }

  submit() {
        console.log('NEW CLIENT ---> ', form);
    }

    getAttrMessage(attr: string
    ) {
        const abstractControl = this.form.get(attr);
        return abstractControl.hasError('required') ? '* Requerido' :
            abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
                abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                    '';
    }
}
