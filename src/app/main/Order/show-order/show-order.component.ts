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
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {ShowOrderService} from "./show-order.service";
import {AllArea, AllDist, AreaDetail, DistModel, Statemodel, streetDetail} from "../../../Model/LocationModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {distributorsModel, GetOrderheader, retailerModel} from "../../../Model/OrderModel";
import {Router} from "@angular/router";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {MatDialog} from "@angular/material/dialog";
import {show_orderLineComponent} from "./show_orderLine/show_orderLine.component";
import {DatePipe} from "@angular/common";
import {BranchModel} from "../../../Model/AddSalespersonModel";
import {PromiseResponse} from "../../../Model/PromiseResponse";
import {retailerDetailsModel} from "../../../Model/DistributorsModel";
import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment } from 'moment';
import {LocalDataSource} from "ng2-smart-table";
import {NgxSpinnerService} from "ngx-spinner";
import {PristineConfirmDialogComponent} from "../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";

const moment = _rollupMoment || _moment;



@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.scss']
})
export class ShowOrderComponent implements OnInit {
    dataSource;
    branch:string='';retailer:string='';sp:string='';order:string='';dist:string='';
    AllBranch:Array<BranchModel>|PromiseResponse
    RetailerDetails:Array<retailerDetailsModel>
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
            edit: true,
            delete: true,
            custom: [{ name: 'ourCustomAction', title: '<i>visibility</i>' }],
            position: 'right'

        },
        rowClassFunction: (row) => {
            if(row.data.order_qty!=null && row.data.approve_reject_status == 'pending' && row.data.got_order=='Yes' && row.data.order_form_uploaded=='no'){
                return 'hide-action-yellow';
            }
            if(row.data.order_qty!=null && row.data.approve_reject_status == 'Approved'){
                return 'green-action';
            }
             if(row.data.approve_reject_status =='Rejected'){
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
        public WebApiHttp: WebApiHttp,public configRef:MatDialog,
        public _locationService: ShowOrderService,public _encryptdecrypt:EncriptDecript,
        public _toasterService: PristineToaster,public router:Router,private spinner: NgxSpinnerService) {
        this.dataSource = new MatTableDataSource<GetOrderheader>(this.OrderheaderDetails)
        this.AllBranch=this._locationService.AllBranch
        this.RetailerDetails=this._locationService.RetailerDetails
    }



  ngOnInit() {
      this.branch=this.AllBranch[0].branch_code
      this.GEtSalesman(this.branch)
      this.GetRetailer(this.branch)
      this.GetDistributor(this.branch)
  }
    GetDistributor(branch){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GeTDistributorBranchWise+branch).then(result=>{
                this.allDistributor=result as distributorsModel[];
            },err=>{
                this._toasterService.onError('error',err)
            })
        }catch (e) {
            this._toasterService.onError('error',e)
        }

    }
    GetRetailer(branch){
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetRetailerBranchWise+branch).then(result=>{
                this.allRetailer=result as retailerModel[];
            },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e);
        }
  }
    GEtSalesman(branch){
        const type='salesperson'
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetSalesman+branch+'/'+type).then(result=>{
                this.Allsalesman=result ;
            },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    get formatDate1() {
        var d = new Date(this.date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    get formatDate2() {
        var d = new Date(this.serializedDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    dataFilter(){
        // this.dataSource.filter=''+Math.random()
     this.spinner.show()
     this.OrderheaderDetails=[]
     try{
         const  json={
             branch:this.branch,
             retailer:this.retailer,
             salesman:this.sp.split('(')[0],
             distributor:this.dist,
             order_status:this.order,
             date1:this.formatDate1,
             date2:this.formatDate2,
         }
         this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.GerOrderHeader,json)
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

     onClickAddOrder(data:any){
            this.router.navigate(['/order/add-order',{response:this._encryptdecrypt.encrypt(JSON.stringify(data.data)),type:'add'}])

     }

     onClickDetails(data:any){
         this.router.navigate(['/order/add-order',{response:this._encryptdecrypt.encrypt(JSON.stringify(data.data)),type:'view'}])
            // var configRef=this.configRef.open(show_orderLineComponent,{
            //     data:data.data
            // })
     }

     deleteOrder(data:any){
        var configRef=this.configRef.open(PristineConfirmDialogComponent)
         configRef.componentInstance.title='Confirm'
         configRef.componentInstance.confirmMessage='Are you sure ! You want to delete'+' '+'('+data.data.order_no+')'
         configRef.afterClosed().subscribe(result=>{
             if(result==true){
                 try {
                     this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteSaleOrder,{order_no:data.data.order_no})
                         .then(result=>{
                             if(result[0].condition.toLowerCase()=='true'){
                                 this._toasterService.onSuccess('success',result[0].message)
                                 this.dataFilter();
                             }else{
                                 this._toasterService.onError('error',result[0].message)
                             }
                         },error=>{
                             this._toasterService.onError('error',error)
                         })
                 }catch (e) {
                     this._toasterService.onError('error',e)
                 }
             }
         })
     }

}
