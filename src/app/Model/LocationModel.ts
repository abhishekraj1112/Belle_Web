export  class Statemodel{
    condition:string;
    message:string;
    id:number;
    state:string;
}

export  class DistModel{
    condition: string;
    state: string;
    dist_Id: string;
    district_name: string;
}

export  class AllDist {
    district_name: string;
    dist_Id: number;
}

export class AreaDetail{
    condition: string;
    area_Id: number;
    state:string;
    district_name: string;
    area_name: string;
}

export class AllArea{
    area_name: string;
    area_Id: number;
}

export class streetDetail{
    condition: string;
    Street_id: number;
    State: string;
    District_name: string;
    Area_name: string;
    Street_name: string;
}

export class brandmodel{

    //sno:number;
    condition:string
    message:string
    brandnm:string;
}
