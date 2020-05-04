import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {MarketListModel, RsmModel} from "../../../Model/AssignareaModel";
import {Statemodel} from "../../../Model/LocationModel";
import {PromiseResponse} from "../../../Model/PromiseResponse";
import {BranchModel} from "../../../Model/AddSalespersonModel";
import {UserRoleModel} from "../../../Model/UserSetupModel";

@Injectable({
  providedIn: 'root'
})
export class Assign_usernameService implements Resolve<any>{
  AllBranchDetail:Array<BranchModel>=[];
  GetUserRoleDetail:Array<UserRoleModel>=[]
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetAllBranch(),this.GetUserRole()]).then(([branch,role])=>{
       this.AllBranchDetail=branch
        this.GetUserRoleDetail=role;
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

  GetSalesman(type,branch){
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetSalesperson+'?role_type='+type+'&branch='+branch)
          .then(result=>resolve(result),reject).catch(err=>reject(err))
    }))
  }
  GetDistributor(type){
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDistList+type)
          .then(result=>resolve(result),reject).catch(err=>reject(err))
    }))
  }

  GetUserRole(){
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetUserRole)
          .then(result=>resolve(result),reject).catch(err=>reject(err))
    }))
  }


}
