import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER, PORT, BASE_PATH} from '../../util/const.util';
import {InventoryModel} from '../../models/inventory.model';

@Injectable({
    providedIn: 'root'
})

export class InventoryService {
    private headers = new HttpHeaders();
    private baseEndpoint = 'inventory/';
    private getAllInventoryEndpoint = 'active/';
    private newItemEndpoint = 'new/';
    private url = SERVER + PORT + BASE_PATH + this.baseEndpoint;

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
}
