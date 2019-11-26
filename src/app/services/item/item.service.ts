import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER, PORT, BASE_PATH} from '../../util/const.util';
import {ItemModel} from '../../models/item.model';
import {map} from 'rxjs/operators';
import MessagesUtill from '../../util/messages.utill';

@Injectable({
    providedIn: 'root'
})

export class ItemService {
    private data;
    private headers = new HttpHeaders();
    private baseEndpoint = 'item/';
    private getAllItemsEndpoint = 'active/';
    private newItemEndpoint = 'new/';
    private url = SERVER + PORT + BASE_PATH + this.baseEndpoint;
    private firstLoadService = true;

    constructor(private _http: HttpClient) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    getAllItems() {
        return this._http.get(
            this.url + this.getAllItemsEndpoint,
            {headers: this.headers}
        );
    }

    newItem(data) {
        return this._http.post(
            this.url + this.newItemEndpoint,
            data,
            {headers: this.headers}
        );
    }

    deleteItem(id: number) {
        return this._http.delete(
            this.url + id,
            {headers: this.headers}
        );
    }

    editItem(data: ItemModel) {
        return this._http.put(
            this.url,
            data,
            {headers: this.headers}
        );
    }

    getData(callback: any, refresh = false) {

        if (this.firstLoadService || refresh) {
            this.getAllItems().subscribe(
                response => {
                    callback(response);
                    this.firstLoadService = false;
                    this.data = response;
                } ,
                error => {
                    MessagesUtill.errorMessage('El servicio no esta disponible en este momento');
                    callback([]);
                }
            );
        } else {
            callback(this.data);
        }
    }
}
