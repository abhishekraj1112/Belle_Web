import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {distributorModel, GetOrderheader, itemgroupModel} from "../../../../Model/OrderModel";
import {brandmodel} from "../../../../Model/LocationModel";

@Injectable({
  providedIn: 'root'
})
export class AddOrderService implements Resolve<any>{
    //distributor:Array<distributorModel>
  Allbrand:Array<brandmodel>

  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetAllBrands()]).then(([brand])=>{
        this.Allbrand=brand;
        resolve();
      },reject).catch(err=>reject(err));

    }))
  }
  GetAllBrands():Promise<any>{
    return new  Promise<any>(((resolve, reject) =>{
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBrand)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

  GetOrderDistributor(salesman):Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDistributor+salesman)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }


}
