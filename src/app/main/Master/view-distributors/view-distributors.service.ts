import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {distributorsDetailsModel} from "../../../Model/DistributorsModel";

@Injectable({
  providedIn: 'root'
})
export class ViewDistributorsService implements Resolve<any>{
  DistList:Array<distributorsDetailsModel>
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetDistributors()]).then(([allDistributors])=>{
         this.DistList=allDistributors
        resolve();
      },reject).catch(err=>reject(err))

    }))
  }

  GetDistributors():Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDistributorsDetails)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }


}
