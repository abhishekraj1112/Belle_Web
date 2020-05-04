export class RsmModel{
    condition:string;
    message:string
    id:number;
    rsm:string
}
export class assignedBrandmodel{
    condition:string
    message:string
    id:number;
    brand:string;
}

export class AssignAreatoSp{
    id:number;
    area_Id:number;
    state:string;
    dist_name:string;
    area_name:string
}
export class assignedState{
    state_id:number;
    State:string
}
export  class retailer{
    retailer_id:number
    firm_name:string
}

export class GetRetailerDetails{
    id:number;
    retailer_id:number;
    retailer_firm_name:string;
    retailer_area:string
}
export class distributorsModel{
    condition:string
    message:string
    id:number;
    firm_name:string
}
export class MarketListModel{
    id:number;
    day_market:string;
    retailer:string;
    state:string;
    dist:string;
    area:string;
}

export class AssignedAreatoSp{

    state:Array<{
        condition:string;
        state:string;
        state_id:number;
    }>
    dist:Array<{
        dist_id:number
        dist:string
    }>
    area:Array<{
        condition:string;
        area_id:number
        area:string
    }>


}
