import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
    panelOpenState = false;
    form: FormGroup;

    constructor() {
        this.form = new FormGroup(
            {
                name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                rfc: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                useCFID: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
                phone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
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
