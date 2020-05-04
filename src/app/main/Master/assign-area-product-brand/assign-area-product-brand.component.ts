import {Component, OnInit,ViewChild} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {AssignAreaProductBrandService} from "./assign-area-product-brand.service";
import {AllArea, AllDist,Statemodel,brandmodel} from "../../../Model/LocationModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {AssignAreatoSp, assignedState, distributorsModel, GetRetailerDetails, retailer, RsmModel} from "../../../Model/AssignareaModel";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {MatDialog} from "@angular/material/dialog";
import {PristineConfirmDialogComponent} from "../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";
import {assignedBrandmodel} from "../../../Model/AssignareaModel";
import {Router} from "@angular/router";
import {BranchModel} from "../../../Model/AddSalespersonModel";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-assign-area-product-brand-location',
  templateUrl: './assign-area-product-brand.component.html',
  styleUrls: ['./assign-area-product-brand.component.scss']
})
export class AssignAreaProductBrandComponent implements OnInit {
     dataSourceAssignStateToRsm:MatTableDataSource<assignedState>;
     displayedColumns:string[]=["state","action"];
     @ViewChild('paginatorAssignStateToRsm', {static: true}) paginatorAssignStateToRsm: MatPaginator;
     @ViewChild('sortAssignStateToRsm', {static: true}) sortAssignStateToRsm: MatSort;

    datasourceAssignBrandToRsm:MatTableDataSource<assignedBrandmodel>;
    displayedColumnsBrandRsm:string[]=["brand","action"];
    @ViewChild('paginatorAssignBrandToRsm', {static: true}) paginatorAssignBrandToRsm: MatPaginator;
    @ViewChild('sortAssignBrandToRsm', {static: true}) sortAssignBrandToRsm: MatSort;

    datasourceAssignedAreaToSp: MatTableDataSource<AssignAreatoSp>;
    ColumnAssignedAreaSp:string[]=["state","dist_name","area_name","action"];
    @ViewChild('paginatorAssignAreaToSp', {static: true}) paginatorAssignAreaToSp: MatPaginator;
    @ViewChild('sortAssignAreaToSp', {static: true}) sortAssignAreaToSp: MatSort;

    datasourceAssignBrandTosp:MatTableDataSource<assignedBrandmodel>;
    displayedColumnsBrandSp:string[]=["brand","action"];
    @ViewChild('paginatorAssignBrandToSp', {static: true}) paginatorAssignBrandToSp: MatPaginator;
    @ViewChild('sortAssignBrandToSp', {static: true}) sortAssignBrandToSp: MatSort;

    datasourceAssignRetailerTosp:MatTableDataSource<GetRetailerDetails>;
    columnAssignretailerSp:string[]=["retailer_firm_name","retailer_area","action"];
    @ViewChild('paginatorAssignRetailerToSp', {static: true}) paginatorAssignRetailerToSp: MatPaginator;
    @ViewChild('sortAssignRetailerToSp', {static: true}) sortAssignRetailerToSp: MatSort;

    datasourceAssignRetailerToDb:MatTableDataSource<GetRetailerDetails>;
    columnAssignretailerDb:string[]=["retailer_firm_name","retailer_area","action"];
    @ViewChild('paginatorAssignRetailerToDb', {static: true}) paginatorAssignRetailerToDb: MatPaginator;
    @ViewChild('sortAssignRetailerToDb', {static: true}) sortAssignRetailerToDb: MatSort;

    datasourceAssignAreaToDB:MatTableDataSource<AssignAreatoSp>;
    ColumnAssignedAreaDb:string[]=["state","dist_name","area_name","action"];
    @ViewChild('paginatorAssignAreaToDb', {static: true}) paginatorAssignAreaToDb: MatPaginator;
    @ViewChild('sortAssignAreaToDb', {static: true}) sortAssignAreaToDb: MatSort;

    datasourceAssignBrandToDb:MatTableDataSource<assignedBrandmodel>;
    displayedColumnsBrandDb:string[]=["brand","action"];
    @ViewChild('paginatorAssignBrandToDb', {static: true}) paginatorAssignBrandToDb: MatPaginator;
    @ViewChild('sortAssignBrandToDb', {static: true}) sortAssignBrandToDb: MatSort;

    selected_OrNot: boolean = false;
    tempselect: Array<string> = [];
    type;brand;areaId;ret_id;distributorsbrand;areaIdToDist;retailerIdToDist;
    Allstate:Array<Statemodel>=[];
    Allbrand:Array<brandmodel>=[];
    AllDistributors:Array<distributorsModel>=[];
    DistList:Array<AllDist>=[];
    AllArea:Array<AllArea>=[];
    AssignAreaToSp:Array<AssignAreatoSp>=[];
    AssignAreaToDist:Array<AssignAreatoSp>=[];
    AssignedState:Array<assignedState>=[];
    AssignedBrand:Array<assignedBrandmodel>=[];
    AssignedBrandToDist:Array<assignedBrandmodel>=[];
    Retailer:Array<retailer>=[];
    assignedretailerdetail:Array<GetRetailerDetails>=[]
    AllBranchDetail:Array<BranchModel>=[];
    assign:FormGroup;
    assignarea:FormGroup;
    assignareatodistributor:FormGroup;
    RsmDetails:Array<RsmModel>=[];
    constructor(public WebApiHttp: WebApiHttp, public _locationService: AssignAreaProductBrandService,private router:Router,
                private composeDialog:MatDialog,public _toasterService: PristineToaster,public fb:FormBuilder,
                public _encriptdecript:EncriptDecript,private spinner: NgxSpinnerService)
    {
        this.AllDistributors=this._locationService.AllDistributors;
        this.AllBranchDetail=this._locationService.AllBranchDetail
        this.assign=this.fb.group({rsm:[null], state:[null], brand:[null]})
        this.assignarea=this.fb.group({branch:[null],salesperson:[null], state:[null], dist:[null], area:[null],})
        this.assignareatodistributor=this.fb.group({distributor:[null], state:[null], dist:[null], area:[null],})
    }

  ngOnInit() {
  }
    applyFilterStateToRsm(filterValue: string, keyName: string) {
        this.dataSourceAssignStateToRsm.filter = filterValue;
        this.dataSourceAssignStateToRsm.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterBrandToRsm(filterValue: string, keyName: string) {
        this.datasourceAssignBrandToRsm.filter = filterValue;
        this.datasourceAssignBrandToRsm.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterAreaToSp(filterValue: string, keyName: string) {
        this.datasourceAssignedAreaToSp.filter = filterValue;
        this.datasourceAssignedAreaToSp.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterBrandToSp(filterValue: string, keyName: string) {
        this.datasourceAssignBrandTosp.filter = filterValue;
        this.datasourceAssignBrandTosp.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterRetailerToSp(filterValue: string, keyName: string) {
        this.datasourceAssignRetailerTosp.filter = filterValue;
        this.datasourceAssignRetailerTosp.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterAreaToDb(filterValue: string, keyName: string) {
        this.datasourceAssignAreaToDB.filter = filterValue;
        this.datasourceAssignAreaToDB.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterBrandToDb(filterValue: string, keyName: string) {
        this.datasourceAssignBrandToDb.filter = filterValue;
        this.datasourceAssignBrandToDb.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterRetailerToDb(filterValue: string, keyName: string) {
        this.datasourceAssignRetailerToDb.filter = filterValue;
        this.datasourceAssignRetailerToDb.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    selectAllBrand(event) {
        this.selected_OrNot = !this.selected_OrNot;
        if (this.selected_OrNot) {
            this.tempselect = [];
            for (var i = 0; i < this.Allbrand.length; i++) {
                this.tempselect.push(this.Allbrand[i].brandnm);
            }
        } else {
            this.tempselect = [];
        }
        this.tempselect.push( this.selected_OrNot?'0':'');
        this.assign.get('brand').setValue(this.tempselect);
        this.brand=this.tempselect;
        this.distributorsbrand=this.tempselect;
    }
    GetBrand(emp_id:any){
        this.assignarea.get('state').setValue('')
        this.assignarea.get('dist').setValue('')
        this.assignarea.get('area').setValue('')
        this.assignareatodistributor.get('state').setValue('')
        this.assignareatodistributor.get('dist').setValue('')
        this.assignareatodistributor.get('area').setValue('')
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetBrand+emp_id)
                .then(result=>{
                    if(result.length>0 && result[0].condition.toLowerCase()=='true'){
                        this.Allbrand=result as brandmodel[];
                    }else{
                        this.Allbrand=[]
                    }
                    this.GetStateTorsm(emp_id)
                },err=>{this._toasterService.onError('error',err)})

        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    GetStateTorsm(data){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetStateRsm+data)
                .then(result=>{
                    this.Allstate=result as Statemodel[];
                },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    GetRetailerTosp(area_id,emp_id){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.retailerToSp+'?area_id='+area_id+'&emp_id='+emp_id)
                .then(result=>{
                    if(result[0].condition.toLowerCase()=='true') {
                        this.Retailer = result as retailer[];
                    }else{
                        var config=this.composeDialog.open(PristineConfirmDialogComponent)
                        config.componentInstance.title='Info'
                        config.componentInstance.confirmMessage="This region's retailer already assigned"
                        this.areaId=''
                        this.areaIdToDist=''
                    }
                },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    GetAreaTodist(dst_id,emp_id){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.AreaTosp+'?dist_id='+dst_id+'&emp_id='+emp_id)
                .then(result=>{
                    if(result.length>0 && result[0].condition.toLowerCase()=='true')
                    {
                        this.AllArea=result as AllArea[];
                    }
                },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    GetAssignState(emp_id:number){
        try {
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAssignedState+emp_id)
                .then(result=>{
                    let response:Array<{condition:string,message:string}>=result
                    this.AssignedState=result as assignedState[];
                        this.dataSourceAssignStateToRsm=new  MatTableDataSource(this.AssignedState)
                        this.dataSourceAssignStateToRsm.paginator=this.paginatorAssignStateToRsm;
                        this.dataSourceAssignStateToRsm.sort=this.sortAssignStateToRsm
                        this.getAssignedBrand(emp_id)
                },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
  }
    GetAssignAreaToSp(emp_id:number){
        try {
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAssignAreaToSp+emp_id)
                .then(result=>{
                    if(Array.isArray(result) && result.length){
                        this.AssignAreaToSp=result as  AssignAreatoSp[];
                        this.datasourceAssignedAreaToSp=new  MatTableDataSource<AssignAreatoSp>(this.AssignAreaToSp)
                        this.datasourceAssignedAreaToSp.paginator=this.paginatorAssignAreaToSp
                        this.datasourceAssignedAreaToSp.sort=this.sortAssignAreaToSp;
                    }else{
                        this._toasterService.onError('error',result.message);
                    }
                },err=>{
                    this._toasterService.onError('error',err)
                })
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    GetDistrict(state_id:number){
        this._locationService.GetAllDist(this.WebApiHttp.ApiUrlArray.GetAllDist,state_id).then(result=>{
            this.DistList=result as AllDist[];
        })
    }
    getAssignedBrand(emp_id:number){
      try {
          this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAssignedBrand+emp_id)
              .then(result=>{
                  if(result[0].condition.toLowerCase()=='true'){
                      this.AssignedBrand=result;
                      if(this.type=='RSM'){
                          this.datasourceAssignBrandToRsm=new  MatTableDataSource(this.AssignedBrand)
                          this.datasourceAssignBrandToRsm.paginator=this.paginatorAssignBrandToRsm;
                          this.datasourceAssignBrandToRsm.sort=this.sortAssignBrandToRsm;
                      }else if(this.type=='SALESPERSON'){
                          this.datasourceAssignBrandTosp=new  MatTableDataSource(this.AssignedBrand)
                          this.datasourceAssignBrandTosp.paginator=this.paginatorAssignBrandToSp;
                          this.datasourceAssignBrandTosp.sort=this.sortAssignBrandToSp;
                      }
                  }else{
                      //this.datasourceAssignBrandToRsm=[]
                      //this.datasourceAssignBrandTosp
                  }
              },err=>{this._toasterService.onError('error',err)})
      }catch (e) {
          this._toasterService.onError('error',e)
      }
  }
    GetAssignRetailer(emp_id:number){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAssignRetailer+emp_id)
                .then(result=>{
                    if(result[0].condition.toLowerCase()=='true') {
                        this.assignedretailerdetail = result as GetRetailerDetails[]
                        if(this.type=='SALESPERSON'){
                            this.datasourceAssignRetailerTosp = new MatTableDataSource<GetRetailerDetails>(this.assignedretailerdetail)
                            this.datasourceAssignRetailerTosp.paginator=this.paginatorAssignRetailerToSp;
                            this.datasourceAssignRetailerTosp.sort=this.sortAssignRetailerToSp;
                        }else if(this.type=='DISTRIBUTOR'){
                            this.datasourceAssignRetailerToDb = new MatTableDataSource<GetRetailerDetails>(this.assignedretailerdetail)
                            this.datasourceAssignRetailerToDb.paginator=this.paginatorAssignRetailerToDb;
                            this.datasourceAssignRetailerToDb.sort=this.sortAssignRetailerToDb;
                        }
                    }else{

                    }
                },err=>{
                    this._toasterService.onError('error',err)
                })
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    GetAssignAreaToDistributor(emp_id:number){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAssignAreaToDistributor+emp_id)
                .then(result=>{
                    if(Array.isArray(result) && result.length){
                        this.AssignAreaToDist = result as AssignAreatoSp[];
                        this.datasourceAssignAreaToDB = new MatTableDataSource(this.AssignAreaToDist)
                        this.datasourceAssignAreaToDB.paginator=this.paginatorAssignAreaToDb
                        this.datasourceAssignAreaToDB.sort=this.sortAssignAreaToDb
                    }else{

                    }

                },err=>{
                    this._toasterService.onError('error',err)
                })
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    getAssignedBrandToDistributor(emp_id:number){
        try {
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAssignBrandToDistributor+emp_id)
                .then(result=>{
                    if(result[0].condition.toLowerCase()=='true'){
                        this.AssignedBrandToDist=result;
                        this.datasourceAssignBrandToDb=new  MatTableDataSource(this.AssignedBrandToDist)
                        this.datasourceAssignBrandToDb.paginator=this.paginatorAssignBrandToDb
                        this.datasourceAssignBrandToDb.sort=this.sortAssignBrandToDb
                    }else{

                    }
                },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    GetRsm(type:string,branch:string){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetRsm+"?type="+type+"&Branch="+branch)
                .then(result=>{
                   this.RsmDetails=result as RsmModel[];
                  if(type=='RSM') {
                      if (this.RsmDetails[0].condition == 'false') {
                          var config = this.composeDialog.open(PristineConfirmDialogComponent)
                          config.componentInstance.title = 'Info'
                          config.componentInstance.confirmMessage = 'RSM Not found!Please Add Rsm'
                          config.afterClosed().subscribe(result => {
                              if (result == true) {
                                  this.router.navigate(['/master/add-salesperson'])
                              }
                          })
                      }
                  }
                },err=>{
                    this._toasterService.onError('error',err)
                })
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    AssignAreaToRsm(){
        this.spinner.show();
        if(this.assign.get('state').value=='' || this.assign.get('state').value==null || this.assign.get('state').value==undefined )
        {
            this._toasterService.onError('error','Please select state to assign')
        }else {
            const json = {
                id: this.assign.get('rsm').value,
                StateId: this.assign.get('state').value,
                type: this.type,
                created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
            }
            try {
                this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AssignArea, json)
                    .then(result => {
                        let response: Array<{ condition: string, message: string }> = result
                        if (response[0].condition.toLowerCase()=='true') {
                            this._toasterService.onSuccess('success', response[0].message)
                            this.GetAssignState(this.assign.get('rsm').value);
                            this.GetStateTorsm(this.assign.get('rsm').value)
                            this.assign.get('state').setValue('')
                            this.spinner.hide();
                        } else {
                            this._toasterService.onError('error', response[0].message)
                            this.spinner.hide();
                        }

                    },err=>{this._toasterService.onError('error', err);this.spinner.hide();})
            } catch (e) {
                this._toasterService.onError('error',e);
                this.spinner.hide();
            }
        }
    }
    AssignAreaTosp(){
        this.spinner.show();
            const json = {
                id: this.assignarea.get('salesperson').value,
                StateId: this.assignarea.get('state').value,
                DistId:this.assignarea.get('dist').value,
                AreaId:this.assignarea.get('area').value,
                type: this.type,
                created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
            }
            try {
                this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AssignAreaToSp, json)
                    .then(result => {
                        let response: Array<{ condition: string, message: string }> = result
                        if (response[0].condition.toLowerCase()=='true') {
                            this._toasterService.onSuccess('success', response[0].message)
                                this.assignarea.get('state').setValue('');
                                this.assignarea.get('dist').setValue('');
                                this.assignarea.get('area').setValue('');
                                this.GetAssignAreaToSp(this.assignarea.get('salesperson').value)
                                this.spinner.hide();
                        } else {
                            this._toasterService.onError('error', response[0].message)
                            this.spinner.hide();
                        }
                    },err=>{this._toasterService.onError('error',err);this.spinner.hide();})
            } catch (e) {
                this._toasterService.onError('error',e);
                this.spinner.hide();
            }

    }
    AssignBrand(){
        this.spinner.show();
     if(this.assign.get('brand').value=='' || this.assign.get('brand').value==null || this.assign.get('brand').value==undefined )
     {
         this._toasterService.onError('error','Please select brand to assign')
         this.spinner.hide();
     }else {
         const json = {
             emp_id: this.assign.get('rsm').value,
             brand_id: this.assign.get('brand').value.filter(item=>{
                 return item!='0'
             }),
             type: this.type,
             created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
         }
         try {
             this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AssignBrand, json)
                 .then(result => {
                     let response: Array<{ condition: string, message: string }> = result
                     if (response[0].condition.toLowerCase() == 'true') {
                         this._toasterService.onSuccess('success', response[0].message);
                         this.GetAssignState(this.assign.get('rsm').value)
                         this.GetBrand(this.assign.get('rsm').value)
                         this.assign.get('brand').setValue('')
                         this.spinner.hide();
                     } else {
                         this._toasterService.onError('error', response[0].message);
                         this.spinner.hide();
                     }
                 }, err => {
                     this._toasterService.onError('error',err);
                     this.spinner.hide();
                 })
         } catch (e) {
             this._toasterService.onError('error',e);
             this.spinner.hide();
         }
     }
    }
    AssignBrandTosp() {
        this.spinner.show();
        if(this.assignarea.get('salesperson').value=='' ||this.assignarea.get('salesperson').value==null ||this.assignarea.get('salesperson').value==undefined )
        {
            this._toasterService.onError('error','Please select salesperson  to assign')
        }
        else if(this.brand=='' || this.brand==null || this.brand==undefined )
        {
            this._toasterService.onError('error','Please select brand to assign')
        } else  {
            const json = {
                emp_id: this.assignarea.get('salesperson').value,
                brand_id: this.brand.filter(item=>{
                    return item!='0'
                }),
                type: this.type,
                created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
            }
            try {
                this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AssignBrand, json)
                    .then(result => {
                        let response: Array<{ condition: string, message: string }> = result
                        if (response[0].condition.toLowerCase() == 'true') {
                            this._toasterService.onSuccess('success', response[0].message);
                            this.getAssignedBrand(this.assignarea.get('salesperson').value)
                            this.GetBrand(this.assignarea.get('salesperson').value)
                            this.brand=''
                            this.spinner.hide();
                        } else {
                            this._toasterService.onError('error', response[0].message);
                            this.spinner.hide();
                        }
                    }, err => {
                        this._toasterService.onError('error',err);
                        this.spinner.hide();
                    })
            } catch (e) {
                this._toasterService.onError('error',e);
                this.spinner.hide();
            }
        }
    }
    AssignRetailer(){
        this.spinner.show();
        if(this.areaId=='' || this.areaId==null || this.areaId==undefined){
            this._toasterService.onError('false','Please select region')
        }else if(this.ret_id=='' || this.ret_id==null ||this.ret_id==undefined){
            this._toasterService.onError('false','Please select retailer')
        }else {
            const json = {
                emp_id: this.assignarea.get('salesperson').value,
                retailer_area_id: this.areaId,
                retailer_id:this.ret_id,
                type: this.type,
                created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
            }
            try {
                this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.Assignretailer, json)
                    .then(result => {
                        console.log(result)
                        let response: Array<{ condition: string, message: string }> = result
                        if (response[0].condition.toLowerCase() == 'true') {
                            this._toasterService.onSuccess('success', response[0].message)
                            this.GetAssignRetailer(this.assignarea.get('salesperson').value)
                            this.areaId = '', this.ret_id = '';
                            this.spinner.hide();
                        } else {
                            this._toasterService.onError('error', response[0].message)
                            this.areaId = '', this.ret_id = ''
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
    AssignAreaToDistributor(){
        this.spinner.show();
        const json = {
            id: this.assignareatodistributor.get('distributor').value,
            StateId: this.assignareatodistributor.get('state').value,
            DistId:this.assignareatodistributor.get('dist').value,
            AreaId:this.assignareatodistributor.get('area').value,
            type: this.type,
            created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
        }
        try {
            this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AssignAreaToSp,json)
                .then(result => {
                    console.log(result);
                    let response: Array<{ condition: string, message: string }> = result
                    if (response[0].condition.toLowerCase()=='true') {
                        this._toasterService.onSuccess('success', response[0].message)
                        this.GetAssignAreaToDistributor(this.assignareatodistributor.get('distributor').value)
                        this.assignareatodistributor.get('state').setValue('')
                        this.assignareatodistributor.get('dist').setValue('')
                        this.assignareatodistributor.get('area').setValue('')
                        this.spinner.hide();
                    } else {
                        this._toasterService.onError('error', response[0].message)
                        this.spinner.hide();
                    }

                },err=>{
                    this._toasterService.onError('error',err)
                    this.spinner.hide();
                })
        } catch (e) {
            this._toasterService.onError('error',e)
            this.spinner.hide();
        }

    }
    AssignBrandToDistributor() {
        this.spinner.show();
        if(this.assignareatodistributor.get('distributor').value=='' ||this.assignareatodistributor.get('distributor').value==null ||this.assignareatodistributor.get('distributor').value==undefined )
        {
            this._toasterService.onError('error','Please select distributor  to assign')
        }
        else if(this.distributorsbrand=='' || this.distributorsbrand==null || this.distributorsbrand==undefined )
        {
            this._toasterService.onError('error','Please select brand to assign')
        } else  {
            const json = {
                emp_id: this.assignareatodistributor.get('distributor').value,
                brand_id: this.distributorsbrand.filter(item=>{
                    return item!='0';
                }),
                type: this.type,
                created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
            }
            try {
                this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.AssignBrand, json)
                    .then(result => {
                        let response: Array<{ condition:string, message: string }> = result
                        if (response[0].condition.toLowerCase() == 'true') {
                            this._toasterService.onSuccess('success', response[0].message);
                            this.getAssignedBrandToDistributor(this.assignareatodistributor.get('distributor').value)
                            this.GetBrand(this.assignareatodistributor.get('distributor').value)
                            this.distributorsbrand='';
                            this.spinner.hide();
                        } else {
                            this._toasterService.onError('error', response[0].message);
                            this.spinner.hide();
                        }
                       // console.log(result);
                    }, err => {
                        this._toasterService.onError('error', err);
                        this.spinner.hide();
                    })
            } catch (e) {
                this._toasterService.onError('error', e);
                this.spinner.hide();
            }
        }
    }
    AssignRetailerToDistributor(){
        this.spinner.show();
        if(this.areaIdToDist==''||this.areaIdToDist==null || this.areaIdToDist==undefined){
            this._toasterService.onError('false','Please select region')
        }else if(this.retailerIdToDist==''||this.retailerIdToDist==null ||this.retailerIdToDist==undefined)
        {
            this._toasterService.onError('false','Please select retailer')
        }else {
            const json = {
                emp_id: this.assignareatodistributor.get('distributor').value,
                retailer_area_id: this.areaIdToDist,
                retailer_id: this.retailerIdToDist,
                type: this.type,
                created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
            }
            try {
                this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.Assignretailer, json)
                    .then(result => {
                        let response: Array<{ condition: string, message: string }> = result
                        if (response[0].condition.toLowerCase() == 'true') {
                            this._toasterService.onSuccess('success', response[0].message)
                            this.GetAssignRetailer(this.assignareatodistributor.get('distributor').value)
                            this.areaIdToDist = '';
                            this.retailerIdToDist = ''
                            this.spinner.hide();
                        } else {
                            this._toasterService.onError('error', response[0].message)
                            this.areaIdToDist = '';
                            this.retailerIdToDist = ''
                            this.spinner.hide();
                        }
                    }, err => {
                        this._toasterService.onError('error', err)
                        this.spinner.hide();
                    })
            } catch (e) {
                this._toasterService.onError('error', e)
                this.spinner.hide();
            }
        }
    }
    deleteAssignArea(data:any){
        //console.log(data)
        var configRef=this.composeDialog.open(PristineConfirmDialogComponent)
        configRef.componentInstance.title='Info'
        configRef.componentInstance.confirmMessage='Are you sure!you want to delete assigned state'
        configRef.afterClosed().subscribe(result=>{
            if(result==true){
                const json={
                    state_id:data.state_id,
                    emp_id:this.assign.get('rsm').value
                }
                try{
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteAssignedArea,json)
                        .then(result=>{
                            let response:Array<{condition:string,message:string}>=result
                            if(response[0].condition.toLowerCase()=='true'){
                                this._toasterService.onSuccess('success',response[0].message)
                                this.GetAssignState(this.assign.get('rsm').value)
                                this.GetStateTorsm(this.assign.get('rsm').value)
                                //this.ngOnInit();
                            }else{
                                this._toasterService.onError('error',response[0].message)
                            }
                        },err=>{
                            console.log(err)
                        })
                }catch (e) {
                    console.log(e)
                }
            }
        })
    }
    deleteAssignBrand(data:any){
        //console.log(data)
        var configRef=this.composeDialog.open(PristineConfirmDialogComponent)
        configRef.componentInstance.title='Info'
        configRef.componentInstance.confirmMessage='Are you sure!you want to delete assigned brand'
        configRef.afterClosed().subscribe(result=>{
            if(result==true){
                const json={
                    id:data.id,
                    brand_id:data.brand
                }
                try{
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteAssignedBrand,json)
                        .then(result=>{
                            //console.log(result)
                            let response:Array<{condition:string,message:string}>=result
                            if(response[0].condition.toLowerCase()=='true'){
                                this._toasterService.onSuccess('success',response[0].message)
                                if(this.type=='RSM'){
                                    this.getAssignedBrand(this.assign.get('rsm').value)
                                    this.GetBrand(this.assign.get('rsm').value)
                                }else if(this.type=='SALESPERSON'){
                                    this.getAssignedBrand(this.assignarea.get('salesperson').value)
                                    this.GetBrand(this.assignarea.get('salesperson').value)
                                }else{
                                    this.getAssignedBrandToDistributor(this.assignareatodistributor.get('distributor').value)
                                    this.GetBrand(this.assignareatodistributor.get('distributor').value)
                                }
                                //this.ngOnInit();
                            }else{
                                this._toasterService.onError('error',response[0].message)
                            }
                        },err=>{console.log(err)})
                }catch (e) {
                    console.log(e);
                }
            }
        })
    }
    DeleteAssignAreaToDist(data:any){
        var configRef=this.composeDialog.open(PristineConfirmDialogComponent)
        configRef.componentInstance.title='Info'
        configRef.componentInstance.confirmMessage='Are you sure!you want to delete assigned area'
        configRef.afterClosed().subscribe(result=>{
            if(result==true){
                const json={area_id:data.area_Id,location_id:data.id}
                try{
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteAssignAreaToDist,json)
                        .then(result=>{
                            let response:Array<{condition:string,message:string}>=result
                            if(response[0].condition.toLowerCase()=='true'){
                                this._toasterService.onSuccess('success',response[0].message)
                                if(this.type=='DISTRIBUTOR')
                                {
                                    this.GetAssignAreaToDistributor(this.assignareatodistributor.get('distributor').value)
                                    if(this.assignareatodistributor.get('dist').value!='' && this.assignareatodistributor.get('dist').value!=null){
                                        this.GetAreaTodist(this.assignareatodistributor.get('dist').value,this.assignareatodistributor.get('distributor').value)
                                    }
                                }else if(this.type=='SALESPERSON'){
                                    this.GetAssignAreaToSp(this.assignarea.get('salesperson').value)
                                    if((this.assignarea.get('dist').value!='' && this.assignarea.get('dist').value!=null) ){
                                        this.GetAreaTodist(this.assignarea.get('dist').value,this.assignarea.get('salesperson').value)
                                    }
                                }
                            }else{
                                this._toasterService.onError('error',response[0].message)
                            }
                        },err=>{
                            this._toasterService.onError('error',err)
                        })
                }catch (e) {
                    this._toasterService.onError('error',e)
                }
            }
        })
    }
    DeleteAssignRetailer(data:any){
        var configRef=this.composeDialog.open(PristineConfirmDialogComponent)
        configRef.componentInstance.title='Info'
        configRef.componentInstance.confirmMessage='Are you sure!you want to delete assigned retailer'
        configRef.afterClosed().subscribe(result=>{
            if(result==true){
                const  json={id:data.id,retailer_id:data.retailer_id}
                try{
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteAssignRetailer,json)
                        .then(result=>{
                            let response:Array<{condition:string,message:string}>=result
                            if(response[0].condition.toLowerCase()=='true'){
                                this._toasterService.onSuccess('success',response[0].message)
                                if(this.type=='DISTRIBUTOR')
                                {
                                    this.GetAssignRetailer(this.assignareatodistributor.get('distributor').value)
                                }else if(this.type=='SALESPERSON'){
                                    this.GetAssignRetailer(this.assignarea.get('salesperson').value)
                                }//this.ngOnInit();
                            }else{
                                this._toasterService.onError('error',response[0].message)
                            }
                        },err=>{
                            this._toasterService.onError('error',err)
                        })
                }catch (e) {
                    this._toasterService.onError('error',e)
                }
            }
        })
    }

}
