import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ScanCompletedHeader} from "../../../../Model/DispatchOrderModel";
import {AppRejDispatchOrderService} from "./app-rej-dispatch-order.service";
import {MatTableDataSource} from "@angular/material/table";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";

@Component({
  selector: 'app-app-rej-dispatch-order',
  templateUrl: './app-rej-dispatch-order.component.html',
  styleUrls: ['./app-rej-dispatch-order.component.scss']
})
export class AppRejDispatchOrderComponent implements OnInit {
  dataSource;
  displayColumn:string[]=["order_no","distributor","total_qty","scan_qty","created_by","Action"];
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatPaginator,{static:true}) sort:MatSort;
  scanCompletedHeader:Array<ScanCompletedHeader>=[]
  constructor(
            private _AppRejDispatchOrderService:AppRejDispatchOrderService,
            private spinner:NgxSpinnerService,
            private router:Router,
            private _encryptdecrypt:EncriptDecript,
              )
  {


  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },1000)
    this.scanCompletedHeader=this._AppRejDispatchOrderService.scanCompletedHeader;
    this.dataSource=new  MatTableDataSource<ScanCompletedHeader>(this.scanCompletedHeader)
    this.dataSource.paginator=this.paginator;
    this.dataSource.socket=this.sort;
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

  onClickView(data:any){
    this.router.navigate(['/dispatch_order/showorderline',{res:this._encryptdecrypt.encrypt(JSON.stringify(data))}])
  }
}
