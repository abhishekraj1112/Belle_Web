export  class GetOrderheader{
    condition:string
    message:string
    order_no: number
    day_market: string
    status:string
    approve_reject_status:string
    reject_reason:string
    retailer: string
    region: string
    area: string
    schedule_visit_date: string
    schedule_visit_time:string
    detail:string;

}

export class ImageModel{
    order_no: number
    image_id: number
    image:string
}
export class distributorModel{
    condition:string;
    message:string;
    id:number;
    distributor:string;
}
export class itemgroupModel{
    condition:string
    message:string
    item_group:string
}
export class Itemcolor{
    condition:string
    message:string
    color:string
    size:string
    cup_size:string
}
export class getorderline{
    condition:string
    message:string
    id:number
    art_no: string
    brand: string
    color: string
    size: string
    qty:number
}

export class articleModel{
    article:string
    qty:number

}
export class retailerModel{
    retailer_id:number
    firm_name:string
}
export class distributorsModel{
    retailer_id:number
    firm_name:string
}
