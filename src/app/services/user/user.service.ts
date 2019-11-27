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
    private headers = new HttpHeaders();
    private url = SERVER + PORT + BASE_PATH + this.baseEndpoint;
    private data: any;
    private firstLoadService = true;

    constructor(
        private _http: HttpClient
    ) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    getAllUsers() {
        return this._http.get(
            this.url + this.getUserEndpoint,
            {headers: this.headers}
        );
    }

    newUser(data) {
        return this._http.post(
            this.url + this.newUserEndpoint,
            data,
        );
    }

    deletedUser(id: number) {
        return this._http.delete(this.url + id, {headers: this.headers});
    }

    editUser(data: UserInterfaceModel) {
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
}
