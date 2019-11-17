
export interface WarehouseInterfaceModel{
    id: number;
    accountingAccount: number;
    address: string;
    name: string;
    reason: string;
    status: number;
}

export class WarehouseModel{
    accountingAccount = 0;
    address = '';
    name = '';
    reason = '';
}
