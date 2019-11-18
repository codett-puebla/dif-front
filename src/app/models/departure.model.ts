export interface DepartureModel {
    id: number;
    date: Date;
    folio: string;
    series: string;
    status: number;
    idStaff: number;
    idWarehouse: number;
}

export interface EntryDetailModel {
    id: number;
    quantity: number;
    status: number;
    idDeparture: number;
    idItem: number;
}
