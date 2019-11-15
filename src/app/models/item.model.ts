export class ItemModel {
    billable = false;
    code = '';
    description = '';
    image = '';
    line = '';
    purchaseAmount = 0;
    saleAmount = 0;
    status = 0;
    trademark = '';
    unitMeasurePurchase = 0;
    unitMeasureSale = 0;
}

export interface ItemInterface {
    id: number;
    code: string;
    description: string;
    image: string;
    line: string;
    purchaseAmount: number;
    saleAmount: number;
    trademark: string;
    unitMeasurePurchase: number;
    unitMeasureSale: number;
    billable: boolean;
}
