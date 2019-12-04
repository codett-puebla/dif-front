import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserInterfaceModel, UserModel} from '../../models/user.model';
import {AuthApiService} from './auth-api.service';
import {map} from 'rxjs/operators';
import {BASE_PATH, PORT, SERVER} from '../../util/const.util';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseEndpoint = 'login';
    private tokenUser: string;
    private isLogged: boolean;
    private userlogged = 'dif-control-api';
    private passwordlogged = 'devglan-secret';
    private url = SERVER + PORT + BASE_PATH + this.baseEndpoint;
    private headers = new HttpHeaders();
    private userLogged: UserInterfaceModel;
    token: string;

    constructor(
        private _http: HttpClient,
    ) {
        // const basic = btoa('dif-control-api:devglan-secret');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        // this.headers.append('Authorization', 'Basic ' + basic);
    }

    login(user: UserModel) {
        return this._http.post(this.url,
            {
                username: user.username,
                password: user.password
            },
            {headers: this.headers, observe: 'response'}
        ).pipe(
            map((resp: HttpResponse<any>) => {
                this.token = resp.headers.get('authorization');
                return this.token;
            }));
    }

    logout() {
        localStorage.clear();
         this.isLogged = false;
    }

    setToken(response) {
        localStorage.setItem('token', response);
    }

    setUserLogged(user: any) {
        localStorage.setItem('username', user.username);
        localStorage.setItem('create', user.create_at);
        localStorage.setItem('typeUser', user.status);
    }

    islogged(): boolean {
        return this.isLogged;
    }

    setLogged(isLogged: boolean) {
        this.isLogged = isLogged;
    }

}
