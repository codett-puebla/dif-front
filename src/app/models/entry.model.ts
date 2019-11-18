export interface EntryModel {
    id: number;
    date: Date;
    folio: string;
    idUser: number;
    series: string;
    status: number;
    idWarehouse: number;
}

export interface EntryDetailModel {
    id: number;
    quantity: number;
    status: number;
    idEntry: number;
    idItem: number;
}
