import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {DistModel, Statemodel, AreaDetail, streetDetail} from "../../../Model/LocationModel";
import {PromiseResponse} from "../../../Model/PromiseResponse";

@Injectable({
  providedIn: 'root'
})
export class AddLocationService implements Resolve<any>{
  AllState:Array<Statemodel>;
  DistDetail:Array<DistModel>=[];
  AreaDetail:Array<AreaDetail>=[];
  StrretDetail:Array<streetDetail>=[]
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
      Promise.all([this.GetAllState(),this.GetDistDetail(),this.GetAreaDetail(),this.GetStreetDetail()])
          .then(([allstate,distdetail,areadetail,streetdetail])=>{
        this.AllState=allstate
        this.DistDetail=distdetail
        this.AreaDetail=areadetail
        this.StrretDetail=streetdetail
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
  GetAreaDetail():Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAreaDetail)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
  GetDistDetail():Promise<any>{
    return  new  Promise<any>(((resolve, reject) =>{
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDistDetail)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
  GetStreet(path,area_id):Promise<any>{
    return  new  Promise<any>(((resolve, reject) => {
      this.webApiHttp.GetDataFromServer(path+area_id)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

  GetStreetDetail():Promise<any>{
    return  new  Promise<any>(((resolve, reject) =>{
      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetStreetDetail)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
  AddState(url,jsonData):Promise<any>{
    return  new  Promise<any>(((resolve, reject) =>{
      this.webApiHttp.PostDataToServer(url,jsonData)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }


  AddDistrict(url,jsonData):Promise<any>{
    return  new  Promise<any>(((resolve, reject) =>{
      this.webApiHttp.PostDataToServer(url,jsonData)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

  AddArea(url,jsonData):Promise<any>{
    return  new  Promise<any>(((resolve, reject) =>{
      this.webApiHttp.PostDataToServer(url,jsonData)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }
  AddStreet(url,jsonData):Promise<any>{
    return  new  Promise<any>(((resolve, reject) =>{
      this.webApiHttp.PostDataToServer(url,jsonData)
          .then(result=>resolve(result),reject).catch(error=>reject(error));
    }))
  }

}
