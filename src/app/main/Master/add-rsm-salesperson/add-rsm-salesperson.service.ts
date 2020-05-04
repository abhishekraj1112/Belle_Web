import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {BranchModel, StateModel} from "../../../Model/AddSalespersonModel";
import {PromiseResponse} from "../../../Model/PromiseResponse";

@Injectable({
  providedIn: 'root'
})
export class AddRsmSalespersonService implements Resolve<any>{
  AllBranch:Array<BranchModel>=[];
  AllState:Array<StateModel>=[];
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetAllBranch(),this.GetAllState()]).then(([allbranch,state])=>{
           this.AllBranch=allbranch;
           this.AllState=state
           resolve();
      },reject).catch(err=>{reject(err)})

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

  GetStreet(path,area_id):Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(path+area_id)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

  GetAllBranch():Promise<any>{
    return  new Promise<any>(((resolve, reject) =>{
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBranch)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

}
