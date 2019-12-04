import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_PATH, PORT, SERVER} from '../../util/const.util';
import {EntryModel} from '../../models/entry.model';
import MessagesUtill from '../../util/messages.utill';

@Injectable({
    providedIn: 'root'
})
export class EntryService {

    private baseEndpoint = 'entry/';
    private getEntryEndpoint = 'active/';
    private newEntryEndpoint = 'new';
    private verifyFolioEndpoint = 'verify';
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

    getAllEntrys() {
        return this._http.get(
            this.url + this.getEntryEndpoint,
            {headers: this.headers}
        );
    }

    newEntry(data) {
        return this._http.post(
            this.url + this.newEntryEndpoint,
            data,
        );
    }

    deletedEntry(id: number) {
        return this._http.delete(this.url + id, {headers: this.headers});
    }

    editEntry(data: EntryModel) {
        return this._http.put(this.url, data,
            {headers: this.headers});
    }

    getData(callback: any, refresh = false) {
        if (this.firstLoadService || refresh) {
            this.getAllEntrys().subscribe(
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

    verifyFolio(folio: string) {
        return this._http.get(
            this.url + this.verifyFolioEndpoint + '?folio=' + folio,
            {headers: this.headers}
        );
    }
}
