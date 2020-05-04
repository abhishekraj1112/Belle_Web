import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {AddLocationService} from "./add-location.service";
import {AllArea, AllDist, AreaDetail, DistModel, Statemodel, streetDetail} from "../../../Model/LocationModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {AllStreetModel} from "../../../Model/AddSalespersonModel";
import {PristineConfirmDialogComponent} from "../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";
import {PromiseResponse} from "../../../Model/PromiseResponse";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit{
  dataSource;DistdataSource;AreadataSource;StreetdataSource;
  AllState:Array<Statemodel>
  DistDetail:Array<DistModel>=[];
  DistList:Array<AllDist>=[];
  AreaDetail:Array<AreaDetail>=[];
  AllArea:Array<AllArea>=[];
  GetStrretDetail:Array<streetDetail>=[]
  Allstreet:Array<AllStreetModel>=[]
  displayedColumns: string[] = ['id', 'state'];
  displayedDistColumns:string[]=['dist_Id','state','district_name'];
  displayedAreaColumns:string[]=['area_Id','state','district_name','area_name'];
  displayedStreetColumns:string[]=['Street_id','State','District_name','Area_name','Street_name'];
  state:number;stateId:number;DistId:number;state_Id:number;Dist_Id:number;Area_Id:number;
  district:FormControl=new FormControl();
  area:FormControl=new  FormControl();
  street:FormControl=new FormControl();
  StateName:FormControl=new FormControl();
  @ViewChild('TableOnePaginator',{static:true}) paginator:MatPaginator;
  @ViewChild('TableTwoPaginator',{static:true}) paginator2:MatPaginator;
  @ViewChild('TableThreePaginator',{static:true}) paginator3:MatPaginator;
  @ViewChild('TablefourPaginator',{static:true}) paginator4:MatPaginator;
  @ViewChild('TableOneSort',{static:true}) sort:MatSort;
  @ViewChild('TableTwoSort',{static:true}) sort2:MatSort;
  @ViewChild('TableThreeSort',{static:true}) sort3:MatSort;
  @ViewChild('TablefourSort',{static:true}) sort4:MatSort;


  constructor(
              public WebApiHttp:WebApiHttp,
              public _locationService:AddLocationService,
              public _toasterService:PristineToaster,private spinner: NgxSpinnerService)
  {
      this.AllState=this._locationService.AllState;
      this.DistDetail=this._locationService.DistDetail
      this.AreaDetail=this._locationService.AreaDetail
      this.GetStrretDetail=this._locationService.StrretDetail
      this.dataSource = new MatTableDataSource(this.AllState)
      this.DistdataSource = new MatTableDataSource<DistModel>(this.DistDetail)
      this.AreadataSource=new  MatTableDataSource<AreaDetail>(this.AreaDetail)
      this.StreetdataSource=new  MatTableDataSource<streetDetail>(this.GetStrretDetail)

  }
  ngOnInit() {
      this.spinner.show();
      setTimeout(()=>{
          this.spinner.hide();
      },1000)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
      this.DistdataSource.paginator=this.paginator2
      this.dataSource.sort=this.sort2
      this.AreadataSource.paginator=this.paginator3
      this.dataSource.sort=this.sort3
      this.StreetdataSource.paginator=this.paginator4
      this.dataSource.sort=this.sort4
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

    applyFilterDistrictData(filterValue: string, keyName: string)
    {
        this.DistdataSource.filter = filterValue;
        this.DistdataSource.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterAreaData(filterValue: string, keyName: string)
    {
        this.AreadataSource.filter = filterValue;
        this.AreadataSource.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }
    applyFilterStreetData(filterValue: string, keyName: string)
    {
        this.StreetdataSource.filter = filterValue;
        this.StreetdataSource.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }

     AddState() {
      this.spinner.show();
         if(this.StateName.value=='' || this.StateName.value==null || this.StateName.value==undefined) {
             this._toasterService.onError('error', 'Please enter state!')
         } else {
             const json = {
                 state_id: this.StateName.value,
                 flag: 'insertState'
             }
             this._locationService.AddState(this.WebApiHttp.ApiUrlArray.AddLocation, json).then(result => {
                 let response: Array<{ condition: string, message: string }> = result
                 if (response[0].condition.toLowerCase() == 'true') {
                     this._toasterService.onSuccess('', response[0].message);
                     this.StateName.setValue('')
                     this.ngOnInit();
                     this.spinner.hide();
                 } else {
                     this._toasterService.onError('Error', response[0].message)
                     this.spinner.hide();
                 }
             }, err => {
                 this._toasterService.onError('Error', err)
                 this.spinner.hide();
             })
         }
     }
     GetArea(data){
           this._locationService.GetArea(this.WebApiHttp.ApiUrlArray.GetAllArea,data)
               .then(result=>{
                   this.AllArea=result as AllArea[];
               },err=>{
                   this._toasterService.onError('Error', err)
               })
     }
     GetDistrict(data){
          this._locationService.GetAllDist(this.WebApiHttp.ApiUrlArray.GetAllDist,data).then(result=>{
              //console.log(result)
              this.DistList=result as AllDist[];
          })
    }
     GetAllStreet(area_id){
            this._locationService.GetStreet(this.WebApiHttp.ApiUrlArray.GetAllStreet,area_id).then(result=>{
                this.Allstreet=result as  AllStreetModel[];
            })
        }
     AddDistrict(){
      this.spinner.show();
      if(this.state==null || this.state==undefined){
          this._toasterService.onError('error','Please select state')
      }
      else if(this.district.value=='' || this.district.value==null || this.district.value==undefined){
          this._toasterService.onError('error','Please enter district')
      }else {
          var json = {
              state_id: this.state,
              district_name: this.district.value,
              flag: "insertDistrict"

          }
          this._locationService.AddDistrict(this.WebApiHttp.ApiUrlArray.AddLocation, json)
              .then(result => {
                  let response: Array<{ condition: string; message: string }> = result;
                  if (response[0].condition.toLowerCase() == 'true') {
                      this._toasterService.onSuccess('', response[0].message);
                      this.ngOnInit();
                      this.district.setValue('');
                      this.state = null;
                      this.spinner.hide();
                  } else {
                      this._toasterService.onError('Error', response[0].message);
                      this.spinner.hide();
                  }
              }, error => {
                  this._toasterService.onError('Error',error);
                  this.spinner.hide();
      })
      }
  }
     AddArea(){
      this.spinner.show();
      if(this.stateId==null || this.stateId==undefined){
          this._toasterService.onError('error','Please select state')
      }
      else if(this.DistId==null || this.DistId==undefined){
          this._toasterService.onError('error','Please select district ')
      }
      else if(this.area.value=='' || this.area.value==null || this.area.value==undefined){
          this._toasterService.onError('error','Please enter area name')
      }else {
          var json = {
              state_id: this.stateId,
              district_name: this.DistId,
              flag: "insertArea",
              area_name: this.area.value

          }
          this._locationService.AddArea(this.WebApiHttp.ApiUrlArray.AddLocation, json)
              .then(result => {
                  let response: Array<{ condition: string; message: string }> = result;
                  if (response[0].condition.toLowerCase() == 'true') {
                      this._toasterService.onSuccess('', response[0].message);
                      this.ngOnInit();
                      this.area.setValue('');
                      this.stateId = null;
                      this.DistId = null;
                      this.spinner.hide();
                  } else {
                      this._toasterService.onError('Error', response[0].message);
                      this.spinner.hide();
                  }
              }, error => {
                  this._toasterService.onError('Error', error);
                  this.spinner.hide();
              })
      }
  }
     AddStreet(){
      this.spinner.show();
      if(this.state_Id==null || this.state_Id==undefined){
          this._toasterService.onError('error','Please select state')
      }
      else if(this.Dist_Id==null || this.Dist_Id==undefined){
          this._toasterService.onError('error','Please select district')
      }
      else if(this.Area_Id==null || this.Area_Id==undefined){
          this._toasterService.onError('error','Please select Area')
      }
      else if(this.street.value=='' || this.street.value==null || this.Dist_Id==undefined){
          this._toasterService.onError('error','Please enter street')
      }else {
          var json = {
              state_id: this.state_Id,
              district_name: this.Dist_Id,
              flag: "insertStreet",
              area_name: this.Area_Id,
              street_name: this.street.value

          }
          this._locationService.AddStreet(this.WebApiHttp.ApiUrlArray.AddLocation,json)
              .then(result => {
                  let response: Array<{ condition: string; message: string }> = result;
                  if (response[0].condition.toLowerCase() == 'true') {
                      this._toasterService.onSuccess('', response[0].message);
                      this.ngOnInit();
                      this.street.setValue('');
                      this.state_Id = null;
                      this.Dist_Id = null;
                      this.Area_Id = null;
                      this.spinner.hide();
                  } else {
                      this._toasterService.onError('Error', response[0].message);
                      this.spinner.hide();
                  }
              }, error => {
                  this._toasterService.onError('Error',error);
                  this.spinner.hide();
              })
      }
  }

}
