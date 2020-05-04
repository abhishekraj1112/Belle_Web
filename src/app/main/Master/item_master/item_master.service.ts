import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {distributorsDetailsModel} from "../../../Model/DistributorsModel";
import {ItemMasterResponse} from "./item_master.component";

@Injectable({
  providedIn: 'root'
})
export class Item_masterService implements Resolve<any>{
  itemasterList:Array<ItemMasterResponse>;
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([]).then(([])=>{
        // if(allDistributors.length>0 && allDistributors[0].condition=="True")
        //  this.itemasterList=allDistributors
        resolve();
      },reject).catch(err=>reject(err))

    }))
  }

  GetAllItemMaster(json):Promise<Array<ItemMasterResponse>>{
    return  new  Promise<Array<ItemMasterResponse>>(((resolve, reject) => {
      this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.GetAllBrandMaster,json)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }


}
