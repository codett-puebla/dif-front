import {Injectable} from '@angular/core';
import {SERVER, PORT, BASE_PATH} from '../../util/const.util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientModel} from '../../models/client.model';
import MessagesUtill from '../../util/messages.utill';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    private baseEndpoint = 'client/';
    private getClientEndpoint = 'active/';
    private newClientEndpoint = 'new';
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

    getAllClients() {
        return this._http.get(
            this.url + this.getClientEndpoint,
            {headers: this.headers}
        );
    }

    newClient(data) {
        return this._http.post(
            this.url + this.newClientEndpoint,
            data,
        );
    }

    deletedClient(id: number) {
        return this._http.delete(this.url + id, {headers: this.headers});
    }

    editClient(data: ClientModel) {
        return this._http.put(this.url, data,
            {headers: this.headers});
    }

    getData(callback: any, refresh = false) {
        if (this.firstLoadService || refresh) {
            this.getAllClients().subscribe(
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
