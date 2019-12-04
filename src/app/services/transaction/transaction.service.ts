import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_PATH, PORT, SERVER} from '../../util/const.util';
import MessagesUtill from '../../util/messages.utill';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private baseEndpoint = 'transaction/';
    private getTransctionEndpoint = 'active/';
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

    getAllTransctions() {
        return this._http.get(
            this.url + this.getTransctionEndpoint,
            {headers: this.headers}
        );
    }

    getData(callback: any, refresh = false) {
        if (this.firstLoadService || refresh) {
            this.getAllTransctions().subscribe(
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

    updateData() {
        this.getAllTransctions().subscribe(
            response => {
                this.data = response;
            } ,
            error => console.log(error)
        );
    }
}
