import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";

@Injectable({
  providedIn: 'root'
})
export class ShowRetailerService implements Resolve<any>{

  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
Promise.all([]).then(([])=>{
  // this.RetailerDetails=retailerdetails

  //resolve();
},reject).catch(err=>reject(err));
    }))
  }



}
