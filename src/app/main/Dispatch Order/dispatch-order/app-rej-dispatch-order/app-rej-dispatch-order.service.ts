import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {ScanCompletedHeader} from "../../../../Model/DispatchOrderModel";

@Injectable({
  providedIn: 'root'
})
export class AppRejDispatchOrderService {
  scanCompletedHeader:Array<ScanCompletedHeader>=[]
  constructor(private  WebApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetScanCompletedHeader()]).then(([header])=>{
       this.scanCompletedHeader=header;
        resolve();
      },reject).catch(error=>reject(error))
    }))
  }

  GetScanCompletedHeader():Promise<any>{
    return new  Promise<any>(((resolve, reject) =>{
      this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetScanCompltedHeader)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
}
