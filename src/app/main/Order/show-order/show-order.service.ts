import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {GetOrderheader} from "../../../Model/OrderModel";
import {BranchModel} from "../../../Model/AddSalespersonModel";
import {PromiseResponse} from "../../../Model/PromiseResponse";
import {retailerDetailsModel} from "../../../Model/DistributorsModel";

@Injectable({
  providedIn: 'root'
})
export class ShowOrderService implements Resolve<any>{
 OrderheaderDetails:Array<GetOrderheader>
    AllBranch:Array<BranchModel>|PromiseResponse
    RetailerDetails:Array<retailerDetailsModel>
 private data=new BehaviorSubject(this.OrderheaderDetails)
    currentData=this.data
  constructor(public webApiHttp:WebApiHttp) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetAllBranch(),this.GetRetailer()]).then(([branch,retailer])=>{
        // this.OrderheaderDetails=orderheader
          this.AllBranch=branch
          this.RetailerDetails=retailer
        resolve();
      },reject).catch(err=>reject(err));

    }))
  }

  // GetOrderHeader():Promise<any>{
  //   return  new  Promise<any>(((resolve, reject) => {
  //     this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GerOrderHeader)
  //         .then(result=>resolve(result),reject).catch(error=>reject(error));
  //   }))
  // }

  GetAllDist(path,state_id):Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(path+state_id)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

  GetArea(path,dist_id):Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(path+dist_id)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

    GetAllBranch():Promise<any>{
        return  new Promise<any>(((resolve, reject) =>{
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBranch)
                .then(result=>resolve(result),reject).catch(error=>reject(error));
        }))
    }

    GetRetailer():Promise<any>{
        return  new  Promise<any>(((resolve, reject) => {
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetRetailerDetails)
                .then(result=>resolve(result),reject).catch(error=>reject(error));
        }))
    }

}






