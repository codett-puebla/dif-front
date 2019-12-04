import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserModel} from '../../models/user.model';

import Swal from 'sweetalert2';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: UserModel = new UserModel();
    private requestInProcess = false;

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _user: UserService
    ) {

    }

    ngOnInit() {
    }

    login(form: NgForm) {
        if (this.validateForm(form)) {
            return;
        }

        Swal.fire({
            allowOutsideClick: false,
            type: 'info',
            text: 'Iniciando sesión, espere por favor...'
        });
        Swal.showLoading();
        this._auth.login(this.user).subscribe(
            response => {
                this._auth.setLogged(true);
                this._auth.setToken(response);

                this._user.getUserForEmail(this.user.username, response).subscribe(
                    response => {
                        this._auth.setUserLogged(response);
                        this._router.navigateByUrl('/dashboard/index');
                        Swal.close();
                    },
                    error => {
                        console.log('Error get user', error);
                    }
                );
            },
            error => {
                Swal.close();
                console.log('Error111 --> ', error);
                this._auth.setLogged(false);
                Swal.fire({
                    type: 'error',
                    title: 'Error en el inicio de sesión',
                    text: 'El usuario o la contraseña son incorrectos'
                });
            }
        );

    }

    validateForm(form: NgForm): boolean {
        return form.invalid;
    }

    saveDataUser(user) {
        localStorage.setItem('username', user.email);
        localStorage.setItem('name', user.name);
        localStorage.setItem('user_type', user.user_type);
        localStorage.setItem('create_time', user.create_time);
    }
}
