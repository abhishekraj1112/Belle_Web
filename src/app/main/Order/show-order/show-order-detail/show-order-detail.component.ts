import {
    AfterViewInit,
    Component,
    EventEmitter,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {distributorsModel, GetOrderheader, retailerModel} from "../../../../Model/OrderModel";
import {Router} from "@angular/router";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {MatDialog} from "@angular/material/dialog";
import {show_orderLineComponent} from "../show_orderLine/show_orderLine.component";
import {DatePipe} from "@angular/common";

import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment } from 'moment';
import {LocalDataSource} from "ng2-smart-table";
import {NgxSpinnerService} from "ngx-spinner";

const moment = _rollupMoment || _moment;



@Component({
  selector: 'app-show-order-detail',
  templateUrl: './show-order-detail.component.html',
  styleUrls: ['./show-order-detail.component.scss']
})
export class ShowOrderDetailComponent implements OnInit {
    dataSource;
    branch:string='';retailer:string='';sp:string='';order:string='';dist:string='';

    Allsalesman:Array<{id:number,salesman:string}>=[]
    allRetailer:Array<retailerModel>=[]
    allDistributor:Array<distributorsModel>=[]
    validate:boolean=false;
    pipe: DatePipe;
    OrderheaderDetails:Array<GetOrderheader>
    date=new Date()
    serializedDate=new Date()
    @ViewChild('TablePaginator', {static: true}) paginator:MatPaginator;
    @ViewChild('TableSort', {static: true}) sort:MatSort;

    serachresult = {
        actions: {
            add: false,
            edit: false,
            delete: false,
            //custom: [{ name: 'ourCustomAction', title: '<i>visibility</i>' }],
            position: 'right'

        },
        rowClassFunction: (row) => {
            if(row.data.order_qty!=null && row.data.approve_reject_status == 'pending' && row.data.got_order=='Yes' && row.data.order_form_uploaded=='no'){
                return 'hide-action-yellow';
            }
            if(row.data.order_qty!=null && row.data.approve_reject_status == 'Approved'){
                return 'green-action';
            }
             if(row.data.approve_reject_status == 'Rejected'){
                return 'red-action';
            }
             if(row.data.got_order=='Yes' && row.data.order_form_uploaded=='Yes'){
                 return 'yellow-action';
             }
             else{
                 return 'hide-action'
             }

        },
        mode: 'external',
        setPage: false,
        pager: {
            perPage: 10
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit">add</i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-close">delete</i>',
            confirmDelete: true,
        },
        columns: {
            order_no: {
                title: 'Order No.',
                type: 'string',
                filter: true
            },
            schedule_visit_day: {
                title: 'Schedule Visit Day.',
                type: 'string',
                filter: true
            },
            schedule_visit_date: {
                title: 'Schedule Visit Date',
                type: 'string',
                filter: true
            },
            schedule_visit_time: {
                title: 'Schedule Visit Time',
                type: 'string',
                filter: true
            },
            salesman: {
                title: 'Salesman',
                type: 'string',
                filter: true
            },
            retailer: {
                title: 'Retailer',
                type: 'string',
                filter: true
            },
            grade: {
                title: 'Grade',
                type: 'string',
                filter: true
            },
            area: {
                title: 'Area',
                type: 'string',
                filter: true
            },
            region: {
                title: 'Region',
                type: 'string',
                filter: true
            },
            order_qty: {
                title: 'Order Qty',
                type: 'string',
                filter: true
            },
            Dis_qty: {
                title: 'Dispatch Qty',
                type: 'string',
                filter: true
            },
            got_order: {
                title: 'Got Order',
                type: 'string',
                filter: true
            },
            no_order_reason: {
                title: 'No Order Reason',
                type: 'string',
                filter: true
            },
            order_form_uploaded: {
                title: 'Order Form Uploaded',
                type: 'string',
                filter: true
            },

            distributor: {
                title: 'distributor',
                type: 'string',
                filter: true
            },
            approve_reject_status: {
                title: 'App/rej Status',
                type: 'string',
                filter: true
            },
            app_rej_date: {
                title: 'App/rej Date',
                type: 'string',
                filter: true
            },
            app_rej_time: {
                title: 'App/rej Time',
                type: 'string',
                filter: true
            },
            percentage_approval: {
                title: 'Percentage Approval',
                type: 'string',
                filter: true
            },
            comments: {
                title: 'Comments',
                type: 'string',
                filter: true
            },
            status: {
                title: 'Status',
                type: 'string',
                filter: true
            },
            reject_reason: {
                title: 'Reject reason',
                type: 'string',
                filter: true
            },
            // detail: {
            //     title: 'Order Details',
            //     type: 'html',
            //     filter: true,
            //     valuePrepareFunction: (detail) => {
            //         return  '<button onclick="onClickDetails($event) href="' + detail + '"><i>visibility</i></button>'; //  Complete';
            //     }
            // },

        },

    };

serachresultdatasource: LocalDataSource = new LocalDataSource();
    constructor(
        public WebApiHttp: WebApiHttp, public configRef:MatDialog,
        public _encryptdecrypt:EncriptDecript,
        public _toasterService: PristineToaster, public router:Router, private spinner: NgxSpinnerService) {
        this.dataSource = new MatTableDataSource<GetOrderheader>(this.OrderheaderDetails)

    }



  ngOnInit() {
      this.spinner.show()
      this.OrderheaderDetails=[]
      try{
          var  branch=this._encryptdecrypt.decrypt(localStorage.getItem('Belle_UserID'))
          this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetOrderDetailBranchWise+branch)
              .then(result=>{
                  this.OrderheaderDetails=result as GetOrderheader[];
                  if(this.OrderheaderDetails[0].condition.toLowerCase()=='true') {
                      this.serachresultdatasource.load(this.OrderheaderDetails)
                      this.spinner.hide()
                  }else{
                      this._toasterService.onError('error','Data Not Found')
                      this.serachresultdatasource.load([]);
                      this.spinner.hide()
                  }
              },err=>{
                  this._toasterService.onError('error',err)
                  this.spinner.hide();
              })
      }catch (e) {
          this._toasterService.onError('error',e)
          this.spinner.hide();
      }
  }

}
