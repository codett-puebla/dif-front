
export interface WarehouseInterfaceModel {
    id: number;
    accountingAccount: number;
    address: string;
    name: string;
    reason: string;
    status: number;
}

export class WarehouseModel {
    id = 0;
    accountingAccount = 0;
    address = '';
    name = '';
    reason = '';
}
