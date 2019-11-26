export interface ItemModel {
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
    storable: boolean;
    inventories?: any;
}
