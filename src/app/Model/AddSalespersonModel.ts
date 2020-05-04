export class BranchModel{
    condition: string
    branch_id:number
    branch_code: string
}
export  class StateModel{
    condition:string;
    id:number;
    state:string;
}
export  class AllDistModel {
    district_name: string;
    dist_Id: number;
}
export class AllAreaModel{
    area_name: string;
    area_Id: number;
}

export class AllStreetModel{
    street_name: string;
    street_id: number;
}

export interface salespersondatamodel{
    id: number
    name: string
    branch: string
    state: string
    district: string
    area: string
    street:string
    type: string
    first_name: string
    last_name: string
    mobile: number
    mobile2: number
    image_url: string
    remark: string
    line1: string
    line2:string
    country: string
    created_on: string
    updated_on: string
}
