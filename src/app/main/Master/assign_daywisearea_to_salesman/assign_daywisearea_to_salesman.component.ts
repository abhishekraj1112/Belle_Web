import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {Assign_daywisearea_to_salesmanService} from "./assign_daywisearea_to_salesman.service";
import {AllArea, AllDist, AreaDetail, DistModel, Statemodel, streetDetail} from "../../../Model/LocationModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {AssignedAreatoSp, MarketListModel, retailer, RsmModel} from "../../../Model/AssignareaModel";
import {MatDialog} from "@angular/material/dialog";
import {PristineConfirmDialogInputComponent} from "../../../../@pristinebase/components/confirm-dialog-input/confirm-dialog-input.component";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {PristineConfirmDialogComponent} from "../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {BranchModel, salespersondatamodel} from "../../../Model/AddSalespersonModel";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-assign_daywisearea_to_salesman',
  templateUrl: './assign_daywisearea_to_salesman.component.html',
  styleUrls: ['./assign_daywisearea_to_salesman.component.scss']
})
export class Assign_daywisearea_to_salesmanComponent implements OnInit{
  dataSource;dataSource1;
  SalesmanDetails:Array<RsmModel>
  AllState:Array<Statemodel>
  DistList:Array<AllDist>=[];
  AllArea;
  Retailer:Array<retailer>=[];
    AllBranchDetail:Array<BranchModel>=[];
  MarketList:Array<MarketListModel>
    AssignedMarketList:Array<MarketListModel>
  displayedColumns: string[] = ['retailer','state','dist','area','day_market','action'];
    displayedColumns1: string[] = ['retailer','state','dist','area','day_market','action'];
  retailer:any;stateId:number;DistId:number;Area_Id:number;salesman_id:string;market_id:number
  @ViewChild('Paginator',{static:true}) paginator:MatPaginator;
  @ViewChild('Sort',{static:true}) sort:MatSort;
    @ViewChild('TableOnePaginator',{static:true}) paginator1:MatPaginator;
    @ViewChild('TableOneSort',{static:true}) sort1:MatSort;



  constructor(
              public WebApiHttp:WebApiHttp,
              public _locationService:Assign_daywisearea_to_salesmanService,public _encriptdecript:EncriptDecript,private spinner: NgxSpinnerService,
              public _toasterService:PristineToaster,public dailogRef:MatDialog,private router:Router)
  {
    this.dataSource = new MatTableDataSource<Statemodel>(this.AllState)
    //this.SalesmanDetails=this._locationService.SalesmanDetails;
    this.AllState=this._locationService.AllState;
    this.MarketList=this._locationService.MarketList;
    this.AllBranchDetail=this._locationService.AllBranchDetail
  }



  ngOnInit() {
      this.dataSource=new  MatTableDataSource(this.MarketList)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort

  }
    applyFilter(filterValue: string, keyName: string)
    {
        this.dataSource.filter = filterValue;
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
  GetSalesperson(branch:string){
      this._locationService.GetSalesman(branch).then(result=>{
          this.SalesmanDetails=result
      })
  }
    selected_OrNot: boolean = false;
    tempselect: Array<any> = [];

    selectAllForUser(event) {
        this.selected_OrNot = !this.selected_OrNot;
        if (this.selected_OrNot) {
            this.tempselect = [];
            for (var i = 0; i < this.Retailer.length; i++) {
                this.tempselect.push(this.Retailer[i].retailer_id);
            }
        } else {
            this.tempselect = [];
        }
        this.tempselect.push( this.selected_OrNot?'0':'');
        this.retailer=this.tempselect;
    }

    GetAssignedDay(data){
      try{
          this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAssignedDayMarket+data)
              .then(result=>{
                  if(result[0].condition.toLowerCase()=='true'){
                      this.AssignedMarketList=result as MarketListModel[];
                      this.dataSource1=new  MatTableDataSource(this.AssignedMarketList)
                      this.dataSource1.paginator=this.paginator1
                      this.dataSource1.sort=this.sort1
                  }else{
                      this.dataSource1=[]
                  }
              },err=>{this._toasterService.onError('error',err)})
      }catch (e) {
          this._toasterService.onError('error',e)
      }
  }
    GetDist(state_id:number){
    this._locationService.GetAllDist(this.WebApiHttp.ApiUrlArray.GetAllDist,state_id)
        .then(dist=>{
          this.DistList=dist;
            if(!(this.DistList.length>0)){
                var configRef=this.dailogRef.open(PristineConfirmDialogComponent)
                configRef.componentInstance.title='Info'
                configRef.componentInstance.confirmMessage='These state does not contain any district ! Please Add district first in "ADD Location" tab'
                configRef.afterClosed().subscribe(result=>{
                    if(result==true){
                        this.router.navigateByUrl('/master/add-location')
                    }
                })
            }
        },err=>{this._toasterService.onError('error',err)})
  }
    GetArea(dist_id){
    this._locationService.GetArea(this.WebApiHttp.ApiUrlArray.GetArea,dist_id)
        .then(area=>{
          this.AllArea=area
            if(!(this.AllArea.condition.toLowerCase()=='true')){
                var configRef=this.dailogRef.open(PristineConfirmDialogComponent)
                configRef.componentInstance.title='Info'
                configRef.componentInstance.confirmMessage='This salesman dont have any assigned  area ! Please assigned area to salesman'
                configRef.afterClosed().subscribe(result=>{
                    if(result==true){
                        this.router.navigateByUrl('/master/assign-area-brand')
                    }
                })
                this.salesman_id=''
            }
        },err=>{this._toasterService.onError('error',err)})
  }
    GetRetailer(area_id:number){
    try{
      this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetRetailer+area_id)
          .then(result=>{
              if(result[0].condition.toLowerCase()=='true'){
                  this.Retailer=result as retailer[];
              }else {
                      var configRef = this.dailogRef.open(PristineConfirmDialogComponent)
                      configRef.componentInstance.title = 'Info'
                      configRef.componentInstance.confirmMessage = 'This salesman dont have any assigned  retailer ! Please assigned retailer to salesman'
                      configRef.afterClosed().subscribe(result => {
                          if (result == true) {
                              this.router.navigateByUrl('/master/assign-area-brand')
                          }
                      })
              }
          },error=>{
              this._toasterService.onError('error',error)
          })
    }catch (e) {
        this._toasterService.onError('error',e)
    }
  }

    AddDayMarket(){
      var configRef=this.dailogRef.open(PristineConfirmDialogInputComponent)
      configRef.componentInstance.confirmMessage='Add Day/Market'
      configRef.componentInstance.inputFieldMessage='Enter Day/market name'
      configRef.afterClosed().subscribe(result=>{
          if(result.condition=='true'){
              const json={
                  day_market_name:result.message,
                  created_by:this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID'))
              }
              try{
                  this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AddDayMarket,json)
                      .then(result=>{
                          console.log(result);
                          let response:Array<{condition:string,message:string}>=result
                          if(response[0].condition.toLowerCase()=='true'){
                              this._toasterService.onSuccess('success',response[0].message)
                              this._locationService.GetMarket().then(result=>{
                                  this.MarketList=result as MarketListModel[];
                                  this.dataSource=new  MatTableDataSource(this.MarketList)
                                  this.dataSource.paginator=this.paginator
                                  this.dataSource.sort=this.sort
                              })
                          }else{
                              this._toasterService.onError('error',response[0].message)
                          }
                      },err=>{
                          err=>{this._toasterService.onError('error',err)}
                      })
              }catch (e) {
                  err=>{this._toasterService.onError('error',e)}
              }
          }
      })
  }

    AssignDayMarket() {
        this.spinner.show();
      if (this.salesman_id == null || this.salesman_id == undefined) {
          this._toasterService.onError('error', 'Please select salesman')

      } else if (this.market_id == null || this.market_id == undefined) {
          this._toasterService.onError('error', 'Please select day/market')
      } else if (this.stateId == null || this.stateId == undefined) {
          this._toasterService.onError('error', 'Please select state')
      } else if (this.DistId == null || this.DistId == undefined) {
          this._toasterService.onError('error', 'Please select dist')
      } else if (this.Area_Id == null || this.Area_Id == undefined) {
          this._toasterService.onError('error', 'Please select area')
      } else if (this.retailer == null || this.retailer == undefined) {
          this._toasterService.onError('error', 'Please select retailer')
      } else {
          const json = {
              salesman_id: this.salesman_id,
              market_id: this.market_id,
              state_id: this.stateId,
              dist_id: this.DistId,
              area_id: this.Area_Id,
              retailer: this.retailer.filter(item=>{
                  return item!='0'
              }),
              created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID'))
          }
          try {
              this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AssignDayMarket, json)
                  .then(result => {
                      let response: Array<{ condition: string, message: string }> = result
                      if (response[0].condition.toLowerCase() == 'true') {
                          this._toasterService.onSuccess('success', response[0].message)
                          this.GetAssignedDay(this.salesman_id)
                          this.market_id = null;
                          this.stateId = null;
                          this.DistId = null;
                          this.Area_Id = null;
                          this.retailer = null;
                          this.spinner.hide();
                      } else {
                          this._toasterService.onError('error', response[0].message)
                          this.spinner.hide();
                      }
                  }, err => {
                      this._toasterService.onError('error',err)
                      this.spinner.hide();
                  })
          } catch (e) {
              this._toasterService.onError('error',e)
              this.spinner.hide();
          }
      }
  }
    DeleteDayMarket(data:any){
      var configRef=this.dailogRef.open(PristineConfirmDialogComponent)
        configRef.componentInstance.title='Info'
        configRef.componentInstance.confirmMessage='Are you sure!you want to delete day/market'
        configRef.afterClosed().subscribe(result=>{
            if(result==true){
                try{
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteDayMarket,{id:data.id})
                        .then(result=>{
                            //console.log(result)
                            if(result[0].condition.toLowerCase()=='true') {
                                this._toasterService.onSuccess('success','Day/Market deleted')
                                this._locationService.GetMarket().then(result => {
                                    this.MarketList = result as MarketListModel[];
                                    this.dataSource = new MatTableDataSource(this.MarketList)
                                    this.dataSource.paginator = this.paginator
                                    this.dataSource.sort = this.sort
                                })
                            }else {
                                this._toasterService.onError('error',result[0].message)
                            }
                        },err=>{this._toasterService.onError('error',result[0].message)})
                }catch (e) {

                }
            }
        })


    }
    DeleteAssignedDayMarket(data:any){
        console.log(data)
        var configRef=this.dailogRef.open(PristineConfirmDialogComponent)
        configRef.componentInstance.title='Info'
        configRef.componentInstance.confirmMessage='Are you sure!you want to delete assigned day/market'
        configRef.afterClosed().subscribe(result=>{
            if(result==true){
                const json={
                    id:data.ret_id,
                    retailer_id:data.retailer_id,
                }
                try{
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteAssignedMarket,json)
                        .then(result=>{
                            if(result[0].condition.toLowerCase()=='true') {
                                this._toasterService.onSuccess('success','Day/Market deleted')
                                this.GetAssignedDay(this.salesman_id)
                            }else {
                                this._toasterService.onError('error',result[0].message)
                            }
                        },err=>{this._toasterService.onError('error',err)})
                }catch (e) {
                    this._toasterService.onError('error',e)
                }
            }
        })


    }
}
