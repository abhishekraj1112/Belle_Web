import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import{Statemodel,brandmodel} from "../../../Model/LocationModel";
import {PromiseResponse} from "../../../Model/PromiseResponse";
import {distributorsModel} from "../../../Model/AssignareaModel";
import {BranchModel} from "../../../Model/AddSalespersonModel";

@Injectable({
  providedIn: 'root'
})
export class AssignAreaProductBrandService implements Resolve<any>{
    AllBranchDetail:Array<BranchModel>=[];
  Allstate:Array<Statemodel>
  Allbrand:Array<brandmodel>
  AllDistributors:Array<distributorsModel>
  constructor(public webApiHttp:WebApiHttp) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise(((resolve, reject) => {
         Promise.all([this.GetAllDistributor(),this.GetAllBranch()]).then(([alldistributors,branch])=>{
           //this.Allstate=allstate;
           //this.Allbrand=allbrands;
             this.AllBranchDetail=branch
           this.AllDistributors=alldistributors;
           resolve();
         },reject).catch(error=>reject(error))
    }))
  }

  // GetAllState():Promise<any>{
  //   return  new  Promise<any>(((resolve, reject) => {
  //     this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllState)
  //         .then(result=>resolve(result),reject).catch(error=>reject(error));
  //   }))
  // }

    GetAllBranch():Promise<any>{
        return  new Promise<any>(((resolve, reject) =>{
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBranch)
                .then(result=>resolve(result),reject).catch(error=>reject(error));
        }))
    }

 // GetAllBrands():Promise<any>{
 //    return new  Promise<any>(((resolve, reject) =>{
 //      this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllBrand)
 //          .then(result=>resolve(result),reject).catch(error=>reject(error));
 //    }))
 // }
    GetAllDistributor():Promise<any>{
        return new  Promise<any>(((resolve, reject) =>{
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDistributorList)
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



}
