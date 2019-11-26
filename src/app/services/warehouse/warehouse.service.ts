import {Injectable} from '@angular/core';
import {SERVER, PORT, BASE_PATH} from '../../util/const.util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WarehouseModel} from '../../models/warehouse.model';
import MessagesUtill from '../../util/messages.utill';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {
    private baseEndpoint = 'warehouse/';
    private getWarehouseEndpoint = 'active/';
    private newWarehouseEndpoint = 'new';
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

    getAllWarehouse() {
        return this._http.get(
            this.url + this.getWarehouseEndpoint,
            {headers: this.headers}
            );
    }

    newWarehouse(data) {
        return this._http.post(
            this.url + this.newWarehouseEndpoint,
            data,
        );
    }

    deletedWarehouse(id: number) {
        return this._http.delete(this.url + id, {headers: this.headers});
    }

    editWarehouse(data: WarehouseModel) {
        return this._http.put(this.url, data,
            { headers: this.headers });
    }

    getData(callback: any, refresh = false) {
        if (this.firstLoadService || refresh) {
            this.getAllWarehouse().subscribe(
                response => {
                    callback(response);
                    this.firstLoadService = false;
                    this.data = response;
                } ,
                error =>  {
                    MessagesUtill.errorMessage('El servicio no esta disponible en este momento');
                    callback([]);
                }
            );
        } else {
            callback(this.data);
        }
    }
}
