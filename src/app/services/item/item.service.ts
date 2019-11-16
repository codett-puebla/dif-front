import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ItemModel} from '../../models/item.model';

@Injectable({
    providedIn: 'root'
})

export class ItemService {
    private data;
    private headers = new HttpHeaders();
    private endpoint = 'http://165.22.2.168:8080/DIFAPI/item/';


    constructor(private _http: HttpClient) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    loadData() {
        this._http.get(
            this.endpoint + '/active',
            {headers: this.headers}
        );
    }

    getData() {
        return data;
    }

    setData(data) {
        this.data = data;
    }

}
