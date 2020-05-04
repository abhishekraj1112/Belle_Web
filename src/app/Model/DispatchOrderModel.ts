 export  class GetOrderModel{
    retailer:string;
    order_no:string;
    qty:string;
    select_byuser:boolean;

}

export class  showDispatchedOrderdataModel {
    order_no:number;
    distributor:string;
    total_qty:number;
    new_line_total_qty:number;
    created_on:string;
    created_by:string
}

 export class BoxIdModel{
    condition: string

    box_no: number
    qty: number
}

export  class itemModel{
    condition: string
    message: string
    info:string
    item_group: string
    art_no: string
    qty: number;
    scan_qty:number;
    inbox_qty:number;
}

export class packingSlipItemDetailModel{
        retailer:string
    retailer_order_no:number
        item_group:string
        color:string
        cup_size:string
        box_no:number;
        item_count:number;
    created_on:string;

}

export  class packingSlipitemsizemodel{
        item_group:string
        color:string
        cup_size:string
        size:number
        qty:number
}

export class Picklistretailerdetailmodel{
    dispatch_order_no: number
    sale_order_no: number
    retailer_order_no: number
    retailer_id: number
    firm_name: string
    address: string;
    distributor:string;
    order_date:string
}

export class Picklistitemdetailmodel{
    item_group: string
    color: string
    cup_size:string
    item_count: number
}

export class Picklistitemsizemodel{
    item_group: string
    color: string
    size: number
    cup_size: string
    qty: number
}

export class Boxidtoprintreport{
    box_no:number
}

export class ScanCompletedHeader {
    order_no:number;
    distributor:string;
    qty:number;
    created_by:string
}

 export class ScanCompletedLine{
     order_no:number;
     retailer:string;
     item_code:string;
     qty:number;
 }
