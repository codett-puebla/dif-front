import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserInterfaceModel, UserRegisterModel} from '../../../../models/user.model';
import {ErrorStateMatcher} from '@angular/material/core';
import {ClientModel} from '../../../../models/client.model';
import {ClientDataTableComponent} from '../client/client-data-table/client-data-table.component';
import {UserDataTableComponent} from './user-data-table/user-data-table.component';
import Swal from 'sweetalert2';
import MessagesUtill from '../../../../util/messages.utill';
import {UserService} from '../../../../services/user/user.service';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import * as _ from 'lodash';

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
    tittle = 'Usuarios';
    icon = 'fa-user';

    // matcher = new MyErrorStateMatcher();

    constructor(
        private _user: UserService
    ) {
        this.user = new UserRegisterModel();

        this.form = new FormGroup(
            {
                email: new FormControl('', [Validators.required, Validators.email], this.validateEmail().bind(this)),
                password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
                confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
                status: new FormControl('', [Validators.required]),
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
            username: this.form.value.email,
            password: this.form.value.password,
            status: this.form.value.status.value,
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
                    console.log(error);
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
                            abstractControl.hasError('isEmailExists') ? 'Esta dirección de correo ya esta registrada' :
                                '';
    }

    editUser(event: UserInterfaceModel) {
        this.form.get('email').setValue(event.username);
        this.form.get('password').setValue(event.password);
        this.form.get('confirmPassword').setValue(event.password);
        this.form.get('status').setValue(event.status);
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

    validateEmail(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return this._user.verifyEmail((control.value as string).trim())
                .pipe(
                    debounceTime(600),
                    map((exist: string) => {
                        console.log('PROIMESA  --_> ', exist);
                        if (!_.isEmpty(exist)) {
                            return {isEmailExists: true};
                        }
                        return null;
                    })
                );
        };
    }
}
