import {Injectable} from '@angular/core';
import {SERVER, PORT, BASE_PATH} from '../../util/const.util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInterfaceModel} from '../../models/user.model';
import MessagesUtill from '../../util/messages.utill';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseEndpoint = 'user/';
    private getUserEndpoint = 'all/';
    private newUserEndpoint = 'new';
    private verifyUserEndpoint = 'verify';
    private getUserForEmailEndpoint = 'getUserForEmail';
    private headers;
    private url = SERVER + PORT + BASE_PATH + this.baseEndpoint;
    private data: any;
    private firstLoadService = true;
    private token = localStorage.getItem('token');

    constructor(
        private _http: HttpClient
    ) {
        this.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': this.token,
        };

    }

    getAllUsers() {
        return this._http.get(
            this.url + this.getUserEndpoint,
            {headers: this.headers}
        );
    }

    newUser(data) {
        console.log(this.headers);
        return this._http.post(
            this.url + this.newUserEndpoint,
            data,
            {headers: this.headers}
        );
    }

    deletedUser(id: number) {
        return this._http.delete(this.url + id, {headers: this.headers});
    }

    editUser(data: any) {
        return this._http.put(this.url, data,
            {headers: this.headers});
    }

    getData(callback: any, refresh = false) {
        if (this.firstLoadService || refresh) {
            this.getAllUsers().subscribe(
                response => {
                    callback(response);
                    this.firstLoadService = false;
                    this.data = response;
                },
                error => {
                    MessagesUtill.errorMessage('El servicio no esta disponible en este momento');
                    callback([], true);
                }
            );
        } else {
            callback(this.data);
        }
    }

    verifyEmail(email: string) {
        return this._http.get(
            this.url + this.verifyUserEndpoint + '?email=' + email,
            {headers: this.headers}
        );
    }

    getUserForEmail(email: string, token: string) {
        return this._http.get(
            this.url + this.getUserForEmailEndpoint + '?email=' + email,
            {headers: {'Authorization': token}}
        );
    }
}
