import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserInterfaceModel, UserRegisterModel} from '../../../../models/user.model';
import {ErrorStateMatcher} from '@angular/material/core';
import {ClientModel} from '../../../../models/client.model';
import {ClientDataTableComponent} from '../client/client-data-table/client-data-table.component';
import {UserDataTableComponent} from './user-data-table/user-data-table.component';
import Swal from 'sweetalert2';
import MessagesUtill from '../../../../util/messages.utill';
import {UserService} from '../../../../services/user/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: UserRegisterModel;
    panelOpenState = false;
    typeUser: any[] = [
        {value: '1', viewValue: 'Usuario'},
        {value: '2', viewValue: 'Administrador'},
    ];
    form: FormGroup;
    editForm: boolean;
    dataEditUser: any;
    @ViewChild(UserDataTableComponent, {static: false})
    dataTable: UserDataTableComponent;


    // matcher = new MyErrorStateMatcher();

    constructor(
        private _user: UserService
    ) {
        this.user = new UserRegisterModel();

        this.form = new FormGroup(
            {
                email: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.email]),
                password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
                confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
                typeUser: new FormControl('', [Validators.required]),
            },
            this.ValidatePasswords('password', 'confirmPassword')
        );
    }

    ngOnInit() {
    }

    submit() {
        Swal.showLoading();
        let data = {
            id: null,
            username : this.form.value.email,
            password : this.form.value.password,
            create_at : '2015-10-01',
            status : 1
        };

        if (this.editForm) {
            data.id = this.dataEditUser.id;
            console.log('EDIT ---> ', data);
            this._user.editUser(data).subscribe(
                response => {
                    this.successRegister('Registro actualizado');
                },
                error => {
                    Swal.close();
                    MessagesUtill.errorMessage('El servicio no esta disponible');
                }
            );
        } else {
            console.log('NEW ITEM ---> ', data);
            this._user.newUser(data).subscribe(
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
            abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 6' :
                abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 20' :
                    abstractControl.hasError('email') ? 'Tiene que ingresar un email valido' :
                        abstractControl.hasError('isEquals') ? 'La contraseña no es igual' :
                            '';
    }

    editUser(event: UserInterfaceModel) {
        this.form.get('email').setValue(event.username);
        this.form.get('password').setValue(event.password);
        this.form.get('confirmPassword').setValue(event.password);
        this.form.get('typeUser').setValue(event.status);
        this.panelOpenState = true;
        this.editForm = true;
        this.dataEditUser = event;
    }

    setStatusOpenState(status: boolean) {
        if (!status) {
            this.form.reset();
            this.editForm = false;
        }
    }


    ValidatePasswords(password: string, confirmPassword: string): any {
        return (formGroup: FormGroup) => {
            const controlL = formGroup.controls[password];
            const controlB = formGroup.controls[confirmPassword];
            if ((controlL.value !== null && controlB.value !== null) && (!controlB.invalid || !controlL.invalid)) {
                controlL.setErrors(null);
                controlB.setErrors(null);
                if (controlL.value !== controlB.value) {
                    controlL.setErrors({isEquals: true});
                    controlB.setErrors({isEquals: true});
                }
            }
        };
    }
}
