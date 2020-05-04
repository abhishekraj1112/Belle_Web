import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {retailerDetailsModel} from "../../../Model/DistributorsModel";
import {BranchModel, StateModel} from "../../../Model/AddSalespersonModel";

@Injectable({
  providedIn: 'root'
})
export class AddRetailerService implements Resolve<any>{
RetailerDetails:Array<retailerDetailsModel>
  AllBranchDetail:Array<BranchModel>=[];
  AllState:Array<StateModel>=[];
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
Promise.all([this.GetAllBranch(),this.GetAllState()]).then(([branch,state])=>{
  // this.RetailerDetails=retailerdetails
  this.AllBranchDetail=branch;
  this.AllState=state;
  resolve();
},reject).catch(err=>reject(err));
    }))
  }



  GetData(path,branch):Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(path+branch)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

  GetRetailer(data):Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetRetailerDetails+data)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

  GetAllBranch():Promise<any>{
    return  new Promise<any>(((resolve, reject) =>{
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBranch)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
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

}
