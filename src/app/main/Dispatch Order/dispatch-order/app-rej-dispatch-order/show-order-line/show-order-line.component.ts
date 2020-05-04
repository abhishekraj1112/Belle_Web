import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgxSpinnerService} from "ngx-spinner";
import {EncriptDecript} from "../../../../../../@pristinebase/Process/EncriptDecript";
import {ActivatedRoute, Router} from "@angular/router";
import {WebApiHttp} from "../../../../../../@pristinebase/Process/WebApiHttp.service";
import {ScanCompletedLine} from "../../../../../Model/DispatchOrderModel";
import {PristineToaster} from "../../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {MatDialog} from "@angular/material/dialog";
import {PristineConfirmDialogComponent} from "../../../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-show-order-line',
  templateUrl: './show-order-line.component.html',
  styleUrls: ['./show-order-line.component.scss']
})
export class ShowOrderLineComponent implements OnInit {
  dataSource;
  DataTableDetail:any;
  GetOrderLine:Array<ScanCompletedLine>=[];
  displayColumn:string[]=["order_no","retailer","item_code","qty"];
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort,{static:true}) sort:MatSort;

  constructor(
            private spinner:NgxSpinnerService,
            private _encryptdecrypt:EncriptDecript,
            private route:ActivatedRoute,
            private WebApiHttp:WebApiHttp,
            private  _toasterservice:PristineToaster,
            private dailogconfig:MatDialog,
            private router:Router,
              ) {}

  ngOnInit(): void {
    this.DataTableDetail = JSON.parse(this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('res')));
    try {
      this.spinner.show();
      this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetScanCompletedLine+this.DataTableDetail.order_no)
          .then(result=>{
            if(Array.isArray(result) && result.length ){
              this.GetOrderLine=result as ScanCompletedLine[];
              this.dataSource= new MatTableDataSource<ScanCompletedLine>(this.GetOrderLine)
               this.dataSource.paginator=this.paginator;
               this.dataSource.sort=this.sort;
                this.spinner.hide();
            }else{
              this._toasterservice.onError('Error','Data Not found')
              this.spinner.hide();
            }
      },error=>{
            this._toasterservice.onError('Error',error)
            this.spinner.hide();
          })
    }catch (e) {
      this._toasterservice.onError('Error',e)
      this.spinner.hide();
    }
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

  onClickApprove(){
    var dialog=this.dailogconfig.open(PristineConfirmDialogComponent)
    dialog.componentInstance.title='Confirm'
    dialog.componentInstance.confirmMessage='Are you sure!want to approve order'
    dialog.afterClosed().subscribe(result=>{
      if(result==true){
        const json={
          order_no:this.DataTableDetail.order_no,
          flag:'approve'
        }
        try{
          this.spinner.show();
          this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.ApproveDispatchOrder,json)
              .then(result=>{
                if(result[0].condition.toLowerCase()=='true'){
                  this._toasterservice.onSuccess('success',result[0].message)
                  this.router.navigate([''])
                  this.spinner.hide()
                }
                this._toasterservice.onError('error',result[0].message)
                this.spinner.hide()
              },error=>{
                this._toasterservice.onError('error',error)
                this.spinner.hide()
              })
        }catch (e) {
          this._toasterservice.onError('error',e)
          this.spinner.hide()
        }
      }
    })
  }

  onClickReject(){
    var dialog=this.dailogconfig.open(PristineConfirmDialogComponent)
    dialog.componentInstance.title='Confirm'
    dialog.componentInstance.confirmMessage='Are you sure!want to reject order'
    dialog.afterClosed().subscribe(result=>{
      if(result==true){
        const json={
          order_no:this.DataTableDetail.order_no,
          flag:'reject'
        }
        try{
          this.spinner.show();
          this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.ApproveDispatchOrder,json)
              .then(result=>{
                if(result[0].condition.toLowerCase()=='true'){
                  this._toasterservice.onSuccess('success',result[0].message)
                  this.router.navigate([''])
                  this.spinner.hide()
                }
                this._toasterservice.onError('error',result[0].message)
                this.spinner.hide()
              },error=>{
                this._toasterservice.onError('error',error)
                this.spinner.hide()
              })
        }catch (e) {
          this._toasterservice.onError('error',e)
          this.spinner.hide()
        }
      }
    })
  }
}
