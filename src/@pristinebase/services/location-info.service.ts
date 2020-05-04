import { Injectable } from '@angular/core';
import {BranchModel} from "../../app/Model/AddSalespersonModel";
import {PromiseResponse} from "../../app/Model/PromiseResponse";
import {WebApiHttp} from "../Process/WebApiHttp.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationInfoService {
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {

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


