import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER, PORT, BASE_PATH} from '../../util/const.util';
import {ItemModel} from '../../models/item.model';
import {map} from 'rxjs/operators';

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


    constructor(private _http: HttpClient) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    getAllItems() {
        return this._http.get(
            this.url + this.getAllItemsEndpoint,
            {headers: this.headers}
        ).pipe(map(data => {
            this.data = data;
            return data;
        }));
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
}
