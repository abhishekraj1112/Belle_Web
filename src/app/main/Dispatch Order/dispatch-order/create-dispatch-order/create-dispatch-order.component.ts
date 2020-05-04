import {Component, OnInit, ViewChild} from '@angular/core';
import {distributorsModel} from "../../../../Model/AssignareaModel";
import {CreateDispatchOrderService} from "./create-dispatch-order.service";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {MatTableDataSource} from "@angular/material/table";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {LocalDataSource} from "ng2-smart-table";
import {MatDialog} from "@angular/material/dialog";
import {addExistingOrderDialogComponent} from "./add-existing-order-dialog/add-existing-order-dialog.component";
import {show_dispatch_orderLineComponent} from "./show_dispatch_orderLine/show_dispatch_orderLine.component";
import {show_sales_orderLineComponent} from "./show_sales_orderLine/show_sales_orderLine.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {GetOrderModel, showDispatchedOrderdataModel} from "../../../../Model/DispatchOrderModel";
import {NgxSpinnerService} from "ngx-spinner";
import {BranchModel} from "../../../../Model/AddSalespersonModel";

@Component({
  selector: 'app-create-dispatch-order',
  templateUrl: './create-dispatch-order.component.html',
  styleUrls: ['./create-dispatch-order.component.scss']
})
export class CreateDispatchOrderComponent implements OnInit {
    dataSource
    dataSource1
    selectAll: boolean = false;
    dist_id: number;
    branch:number;
    total_qty: number = 0;
    displayedColumns: string[] = ["order_no","retailer","qty", "action"]
    displayedColumns1: string[] = ["order_no","retailer", "qty"]
    @ViewChild('TablePaginator', {static: true}) paginator:MatPaginator;
    @ViewChild('TableSort', {static: true}) sort:MatSort;
    @ViewChild('TablePaginator1', {static: true}) paginator1:MatPaginator;
    @ViewChild('TableSort1', {static: true}) sort1:MatSort;
    AllDistributors: Array<distributorsModel>;
    OrderDetails: Array<GetOrderModel> = [];
    showDispatchedOrder: Array<showDispatchedOrderdataModel> = [];
    AllBranchDetail:Array<BranchModel>=[];
    serachresult = {
        actions: {
            add: false,
            edit: true,
            delete: true,
            //custom: [{name: 'ourCustomAction', title: '<i>visibility</i>'}],
            position: 'right'

        },
        rowClassFunction: (row) => {
            if(row.data.scan_status=='Completed'){
                return 'hide-action';
            }

        },
        mode: 'external',
        setPage: false,
        pager: {
            perPage: 100
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"><img src="/assets/icons/scan.png" width="20px" height="20px" matTooltip="Click to scan order"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-close" style="color:black">visibility</i>',
            confirmDelete: true,
        },
        columns: {
            order_no: {
                title: 'Order no.',
                type: 'string',
                filter: true
            },
            distributor: {
                title: 'Distributor',
                type: 'string',
                filter: true
            },
            created_on: {
                title: 'Order date',
                type: 'string',
                filter: true
            },
            created_by: {
                title: 'Order created by',
                type: 'string',
                filter: true
            },
            new_line_total_qty: {
                title: 'Total qty',
                type: 'string',
                filter: true
            },
        },

    };
    serachresultdatasource: LocalDataSource = new LocalDataSource();

    constructor(private _dispatchOrderService: CreateDispatchOrderService,
                private webApiHttp: WebApiHttp,
                public router:Router,
                private _encryptdecrypt:EncriptDecript,
                public _encriptdecript: EncriptDecript,
                private _toasteService: PristineToaster,
                public dialogConfig:MatDialog,
                private spinner: NgxSpinnerService)
    {
        this.AllDistributors = this._dispatchOrderService.AllDistributors
        this.AllBranchDetail=this._dispatchOrderService.AllBranchDetail
    }
 userType;
    ngOnInit() {
        this.userType=this._encriptdecript.decrypt(localStorage.getItem('Belle_UserType'))
        this.spinner.show()
        setTimeout(()=>{
            this.spinner.hide()
        },1000)
       if(this.userType.toLowerCase()=='branch admin'){
          var branch_id=this._encriptdecript.decrypt(localStorage.getItem('Belle_UserID'))
           this.getDistributorList(branch_id);
       }
    }
  getDistributorList(branch_id:any){
      try{
          this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetDistributorlistBranchWise+branch_id)
              .then(result=>{
                  this.AllDistributors=result as distributorsModel[];
              })
      }catch (e) {

      }
  }
    GetOrderDetails(dist_id) {
        this.spinner.show();
        try {
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetOrderDetail + dist_id)
                .then(result => {

                    this.OrderDetails = result as GetOrderModel[]
                    //console.log(this.OrderDetails)
                    this.dataSource = new MatTableDataSource(this.OrderDetails)
                    this.dataSource.paginator=this.paginator
                    this.dataSource.sort=this.sort
                    this.ShowDispatchedorder(dist_id)
                    this.spinner.hide()
                })
        } catch (e) {

        }
    }

    ShowDispatchedorder(dist_id) {
        try {
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.ShowDispatchedOrder + dist_id)
                .then(result => {
                    this.showDispatchedOrder = result as showDispatchedOrderdataModel[]
                    //console.log(this.OrderDetails)
                    this.serachresultdatasource.load(this.showDispatchedOrder)
                })
        } catch (e) {

        }
    }

    OnSelectAll(event) {
        if (event.checked == true) {
            for (let i = 0; i < this.dataSource.data.length; i++) {
                this.dataSource.data[i].select_byuser = true
            }
        } else {
            for (let i = 0; i < this.dataSource.data.length; i++) {
                this.dataSource.data[i].select_byuser = false
            }
        }
    }

    selectRowCheckBox(event, index) {
        for (let i = 0; i < this.dataSource.data.length; i++) {
            if (this.dataSource.data[i].select_byuser==false) {
                this.selectAll=false
                break;
            } else if(this.dataSource.data[i].select_byuser==true){
                this.selectAll=true
            }
        }
    }

    addOrder() {

        var tempData = []
        this.total_qty = 0;
        if(this.dataSource!=null || this.dataSource!=undefined) {
            for (let i = 0; i < this.dataSource.data.length; i++) {
                if (this.dataSource.data[i].select_byuser == true) {
                    tempData.push(this.dataSource.data[i])
                    this.total_qty += this.dataSource.data[i].qty
                }
            }
        }
     if(!(Array.isArray(tempData) && tempData.length)){
         this._toasteService.onError('error','select order first')
     }
     else {
         this.spinner.show();
         const  json={
             order_detail: tempData.filter(item => {
                 return delete item.select_byuser
             }),
         }
         try{
             this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.AddToOrderForDispatch,json)
                 .then(result=>{
                     this.dataSource1 = new MatTableDataSource(result)
                     this.dataSource1.paginator=this.paginator1
                     this.dataSource1.sort=this.sort1
                     this.spinner.hide();
                 },err=>{
                     this._toasteService.onError('error',err)
                     this.spinner.hide();
                 })
         }catch (e) {
             this._toasteService.onError('error',e)
             this.spinner.hide();
         }
     }
    }

    createDispatchOrder() {
        if(this.dataSource1==null || this.dataSource1==undefined){
            this._toasteService.onError('error','Unable to process!Please first add order line to create order')
        }else {
            this.spinner.show()
            const json = {
                distributor: this.dist_id,
                total_qty: this.total_qty,
                //order_no: 0,
                created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
                order_detail: this.dataSource1.data.filter(item => {
                    return delete item.select_byuser
                }),
            }
            try {
                this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.CreateDispatchOrder, json)
                    .then(result => {
                        console.log(result)
                        if (result[0].condition.toLowerCase() == 'true') {
                            this._toasteService.onSuccess('success', result[0].message)
                            this.GetOrderDetails(this.dist_id)
                            this.dataSource1 = []
                            this.selectAll=false;
                            this.spinner.hide();
                        } else {
                            this._toasteService.onError('error', result[0].message)
                            this.spinner.hide();
                        }
                    }, err => {
                        this._toasteService.onError('error', err)
                        this.spinner.hide();
                    })
            } catch (e) {
                this._toasteService.onError('error', e)
                this.spinner.hide()
            }
        }
    }

    addOrdertoExistibgOrder(){
        if(!(this.dataSource1)){
            this._toasteService.onError('error','Unable to process!Please first add order line to create order')
        }else {
            var dialogConfig = this.dialogConfig.open(addExistingOrderDialogComponent, {
                data: this.showDispatchedOrder
            })
            dialogConfig.afterClosed().subscribe(result => {
                if (result.condition == 'true') {
                    const json = {
                        distributor: this.dist_id,
                        total_qty: this.total_qty,
                        order_no: result.message,
                        created_by: this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
                        order_detail: this.dataSource1.data.filter(item => {
                            return delete item.select_byuser
                        }),
                    }
                    try {
                        this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.CreateDispatchOrder, json)
                            .then(result => {
                                console.log(result)
                                if (result[0].condition.toLowerCase() == 'true') {
                                    this._toasteService.onSuccess('success', result[0].message)
                                    this.GetOrderDetails(this.dist_id)
                                    this.dataSource1 = []
                                    this.selectAll=false
                                } else {
                                    this._toasteService.onError('error', result[0].message)
                                }
                            }, err => {
                                this._toasteService.onError('error', err)
                            })
                    } catch (e) {
                        this._toasteService.onError('error', e)
                    }
                }
            })
        }
    }

    showDispatchorderLine(orderData){
        var dialog=this.dialogConfig.open(show_dispatch_orderLineComponent,{
            data:orderData.data
        })
    }

    ScanOrder(event){
     this.router.navigate(['/dispatch_order/scan-order',{response:this._encryptdecrypt.encrypt(JSON.stringify(event.data))}])

    }

}

