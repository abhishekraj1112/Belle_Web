import { Injectable } from '@angular/core';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {distributorsModel} from "../../../../Model/AssignareaModel";
import {BranchModel} from "../../../../Model/AddSalespersonModel";

@Injectable({
  providedIn: 'root'
})
export class CreateDispatchOrderService {
  AllDistributors:Array<distributorsModel>
  AllBranchDetail:Array<BranchModel>=[];
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetAllBranch()]).then(([branch])=>{
        this.AllBranchDetail=branch;
        resolve();
      },reject).catch(error=>reject(error))
    }))
  }
  // GetAllDistributor():Promise<any>{
  //   return new  Promise<any>(((resolve, reject) =>{
  //     this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDistributorList)
  //         .then(result=>resolve(result),reject).catch(error=>reject(error));
  //   }))
  // }

  GetAllBranch():Promise<any>{
    return  new Promise<any>(((resolve, reject) =>{
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBranch)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
}
