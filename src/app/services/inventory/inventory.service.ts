import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER, PORT, BASE_PATH} from '../../util/const.util';
import {InventoryModel} from '../../models/inventory.model';
import MessagesUtill from '../../util/messages.utill';

@Injectable({
    providedIn: 'root'
})

export class InventoryService {
    private headers = new HttpHeaders();
    private baseEndpoint = 'inventory/';
    private getAllInventoryEndpoint = 'active/';
    private newItemEndpoint = 'new/';
    private url = SERVER + PORT + BASE_PATH + this.baseEndpoint;
    private firstLoadService = true;
    private data;

    constructor(
        private _http: HttpClient
    ) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    getAllInventory() {
        return this._http.get(
            this.url + this.getAllInventoryEndpoint,
            {headers: this.headers}
        );
    }

    deleteInventory(id: number) {
        return this._http.delete(
            this.url + id,
            {headers: this.headers}
        );
    }

    getData(callback: any, refresh = false) {

        if (this.firstLoadService || refresh) {
            this.getAllInventory().subscribe(
                response => {
                    this.firstLoadService = false;
                    this.data = response;
                    callback(this.data);
                } ,
                error =>  {
                    MessagesUtill.errorMessage('El servicio no esta disponible en este momento');
                    callback([]);
                }
            );
        } else {
            console.log('DATA ELSE --> ', this.data);
            callback(this.data);
        }
    }
}
