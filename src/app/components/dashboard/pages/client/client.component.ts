import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ClientModel} from '../../../../models/client.model';
import {ClientService} from '../../../../services/client/client.service';
import Swal from 'sweetalert2';
import MessagesUtill from '../../../../util/messages.utill';
import {ClientDataTableComponent} from './client-data-table/client-data-table.component';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
    panelOpenState = false;
    form: FormGroup;
    editForm: boolean;
    dataEditClient: any;
    @ViewChild(ClientDataTableComponent, {static: false})
    dataTable: ClientDataTableComponent;

    constructor(
        private _client: ClientService
    ) {
        this.form = new FormGroup(
            {
                name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
                email: new FormControl('', [Validators.required, Validators.email]),
                address: new FormControl('', [Validators.required, Validators.maxLength(30)]),
                rfc: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
                useCFID: new FormControl('', []),
                phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            }
        );
        this.editForm = false;
    }

    ngOnInit() {
    }

    submit() {
        let data = this.form.value;
        Swal.showLoading();

        if (this.editForm) {
            data.id = this.dataEditClient.id;
            data.status = 1;
            console.log('NEW CLIENT IF ---> ', data);
            this._client.editClient(data).subscribe(
                response => {
                    this.successRegister('Registro actualizado');
                },
                error => {
                    Swal.close();
                    MessagesUtill.errorMessage('El servicio no esta disponible');
                }
            );
        } else {
            data.status = 1;
            this._client.newClient(data).subscribe(
                response => {
                    this.successRegister('Registro éxitoso');
                },
                error => {
                    Swal.close();
                    MessagesUtill.errorMessage('El servicio no esta disponible');
                }
            );
        }
    }

    successRegister(message: string) {
        this.dataTable.setDataSource(true);
        MessagesUtill.successMessage('Éxito', message);
        this.form.reset();
        this.panelOpenState = false;
        this.editForm = false;
    }

    getAttrMessage(attr: string) {
        const abstractControl = this.form.get(attr);
        return abstractControl.hasError('required') ? '* Requerido' :
            abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 9' :
                abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
                    '';
    }

    editClient(event: ClientModel) {
        this.form.get('name').setValue(event.name);
        this.form.get('email').setValue(event.email);
        this.form.get('address').setValue(event.address);
        this.form.get('rfc').setValue(event.rfc);
        this.form.get('useCFID').setValue(event.useCFID);
        this.form.get('phone').setValue(event.phone);
        this.panelOpenState = true;
        this.editForm = true;
        this.dataEditClient = event;
    }

    setStatusOpenState(status: boolean) {
        if (!status) {
            this.form.reset();
            this.editForm = false;
        }
    }
}
