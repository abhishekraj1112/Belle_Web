import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {MarketListModel, RsmModel} from "../../../Model/AssignareaModel";
import {Statemodel} from "../../../Model/LocationModel";
import {PromiseResponse} from "../../../Model/PromiseResponse";
import {BranchModel} from "../../../Model/AddSalespersonModel";

@Injectable({
  providedIn: 'root'
})
export class Assign_daywisearea_to_salesmanService implements Resolve<any>{
  SalesmanDetails:Array<RsmModel>
  AllState:Array<Statemodel>
  MarketList:Array<MarketListModel>
  AllBranchDetail:Array<BranchModel>=[];
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetAllState(),this.GetMarket(),this.GetAllBranch()]).then(([state,market,branch])=>{
       // this.SalesmanDetails=salesman;
        this.AllState=state;
        this.MarketList=market;
        this.AllBranchDetail=branch
        resolve();
      }).then(reject).catch(err=>reject(err))

    }))
  }

  GetAllBranch():Promise<any>{
    return  new Promise<any>(((resolve, reject) =>{
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBranch)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
  GetSalesman(branch){
    const type='SALESPERSON'
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetRsm+'?type='+type+'&branch='+branch)
          .then(result=>resolve(result),reject).catch(err=>reject(err))
    }))
  }

  GetAllState():Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllState)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

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
  GetMarket():Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDayMarketList)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
}
