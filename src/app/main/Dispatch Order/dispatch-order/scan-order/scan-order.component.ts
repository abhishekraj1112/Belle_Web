import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {
    BoxIdModel, Boxidtoprintreport,
    itemModel,
    packingSlipItemDetailModel, packingSlipitemsizemodel,
} from "../../../../Model/DispatchOrderModel";
import {FormControl} from "@angular/forms";
import {isArray, isObject} from "util";
import {bootloader} from "@angularclass/hmr";
import {MatDialog} from "@angular/material/dialog";
import {show_scanned_itemComponent} from "./show_scanned_item/show_scanned_item.component";
import {PristineConfirmDialogComponent} from "../../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-scan-order',
    templateUrl: './scan-order.component.html',
    styleUrls: ['./scan-order.component.scss']
})
export class ScanOrderComponent implements OnInit {
    DataTableDetail: any
    dataSource;
    showSelectBox:boolean=false
    ScannedItemdataSource;
    TotalScannedItemdataSource
    date = new Date();
    pendingQty: number = 0
    order_no: number;
    order_id:number;
    retailer: string;
    BoxNo: Array<BoxIdModel>=[];
    itemDetail: Array<itemModel>=[];
    Item_DetailList: Array<packingSlipItemDetailModel>=[];
    Item_StyleList: Array<packingSlipitemsizemodel>=[];
    TotalItemStyle: Array<number>=[];
    box_id:Array<Boxidtoprintreport>=[];
    barcode: FormControl = new FormControl();
    displayedColumns: string[] = ["order_no","retailer", "qty", "scan_qty", "pending_qty", "box_completed", "action"];
    displayedScanneditemColumns:string[] = ["order_no","item_code","box_no","total_qty","scan_qty"];
    displayedTotalScanneditemColumns:string[] = ["order_no","item_code","box_no","total_qty","scan_qty"];
    @ViewChild('content', {static: true}) divcontent: ElementRef;
    @ViewChild('TablePaginator', {static: true}) paginator: MatPaginator;
    @ViewChild('TableSort', {static: true}) sort: MatSort;
    @ViewChild('ScanneditemPaginator', {static: true}) paginator1: MatPaginator;
    @ViewChild('ScanneditemTableSort', {static: true}) sort1: MatSort;
    @ViewChild('TotalScanneditemPaginator', {static: true}) paginator2: MatPaginator;
    @ViewChild('TotalScanneditemTableSort', {static: true}) sort2: MatSort;

    constructor(private _encryptdecrypt: EncriptDecript, private _toasterService: PristineToaster,private router:Router,
                private route: ActivatedRoute, private webApiHttp: WebApiHttp, private dialogConfig: MatDialog) {
    }

    ngOnInit() {
        this.DataTableDetail = JSON.parse(this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('response')));
        try {
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.ShowDispatchLineToScan + this.DataTableDetail.order_no)
                .then(result => {
                    this.dataSource = new MatTableDataSource(result)
                    this.dataSource.paginator = this.paginator
                    this.dataSource.sort = this.sort
                    this.pendingQty = 0
                    for (let i = 0; i < this.dataSource.data.length; i++) {
                        this.pendingQty += this.dataSource.data[i].pending_qty
                    }
                },err=>{
                    this._toasterService.onError('error',err)
                })
        } catch (e) {
            this._toasterService.onError('error',e)
        }
     this.showTotalScannedItemlist(this.DataTableDetail.order_no)
    }

    getBoxiDtoprintreport(order_no){
        try {
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetBoxIDtoprintreport+order_no)
                .then(result=>{
                    //console.log(result)
                    if(result[0].condition.toLowerCase()=='true'){
                        this.box_id=result as Boxidtoprintreport[];
                    }
                },err=>{})
        }catch (e) {
            this._toasterService.onError('error',e);
        }
    }

    getRetailer() {
        try {
            this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.GetBoxId, {
                retailer_id: this.order_no,
                newBoxNo:''
            })
                .then(result => {
                    this.BoxNo = result as BoxIdModel[];
                },err=>{this._toasterService.onError('err',err)})
        } catch (e) {
        }
      this.shoWscanneditemlist(this.order_no)
    }

    shoWscanneditemlist(order_no){
        try{
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.ShowScanneditem+order_no)
                .then(result=>{
                    //console.log(result)
                    this.ScannedItemdataSource=new MatTableDataSource(result)
                    this.ScannedItemdataSource.paginator=this.paginator1
                    this.ScannedItemdataSource.sort=this.sort1
                },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    showTotalScannedItemlist(order_no){
        try{
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.ShowTotalScannedItem+order_no)
                .then(result=>{
                    //console.log(result)
                    this.TotalScannedItemdataSource=new MatTableDataSource(result)
                    this.TotalScannedItemdataSource.paginator=this.paginator2
                    this.TotalScannedItemdataSource.sort=this.sort2
                },err=>{this._toasterService.onError('error',err)})
        }catch (e) {
            this._toasterService.onError('error',e)
        }
    }
    getPackingslipreportdata(order_no,box_no) {
        try {
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetPackingSlipreportData+"?order_no="+ order_no+"&box_id="+box_no)
                .then(result => {
                    this.TotalItemStyle = [];
                    if (isObject(result) && result.condition.toLowerCase() == 'true') {
                        this.Item_DetailList = result.itemDetail;
                        this.Item_StyleList = result.itemSize;
                        for (let i = 0; i < this.Item_StyleList.length; i++) {
                            let verify: boolean = false;
                            for (let j = 0; j < this.TotalItemStyle.length; j++) {
                                if (this.TotalItemStyle[j] == this.Item_StyleList[i].size) {
                                    verify = true;
                                    break
                                }
                            }
                            if (!verify) {
                                this.TotalItemStyle.push(this.Item_StyleList[i].size);

                            }
                        }

                    }
                },err=>{
                    this._toasterService.onError('error',err)
                })
        } catch (e) {
            this._toasterService.onError('error',e)
        }
    }

    getCalculatedQty(ParentData: packingSlipItemDetailModel, ItemData: number) {
        for (let i = 0; i < this.Item_StyleList.length; i++) {
            if (ParentData.item_group == this.Item_StyleList[i].item_group && ParentData.cup_size == this.Item_StyleList[i].cup_size && ParentData.color == this.Item_StyleList[i].color && this.Item_StyleList[i].size == ItemData) {
                return this.Item_StyleList[i].qty;
            }
        }
        return '';
    }

    getTotalQty(size: number) {
        let sumOfqty = 0;
        for (let i = 0; i < this.Item_StyleList.length; i++) {
            if (this.Item_StyleList[i].size == size) {
                sumOfqty += this.Item_StyleList[i].qty;
            }
        }
        return sumOfqty;
    }

    ShowScanneditem(data) {
        var dialogConfig = this.dialogConfig.open(show_scanned_itemComponent, {
            data: data
        })
    }

    getRowWiseTotal(ParentData: packingSlipItemDetailModel) {
        let sumOfqty = 0
        for (let i = 0; i < this.Item_StyleList.length; i++) {
            if (ParentData.item_group == this.Item_StyleList[i].item_group && ParentData.cup_size == this.Item_StyleList[i].cup_size && ParentData.color == this.Item_StyleList[i].color) {
                sumOfqty += this.Item_StyleList[i].qty;
            }
        }
        return sumOfqty;
    }

    getRowWiseGrandTotal() {
        let sumOfqty = 0
        for (let j = 0; j < this.Item_DetailList.length; j++) {
            var ParentData: packingSlipItemDetailModel = this.Item_DetailList[j];
            for (let i = 0; i < this.Item_StyleList.length; i++) {
                if (ParentData.item_group == this.Item_StyleList[i].item_group && ParentData.cup_size == this.Item_StyleList[i].cup_size && ParentData.color == this.Item_StyleList[i].color) {
                    sumOfqty += this.Item_StyleList[i].qty;
                }
            }
        }
        return sumOfqty;
    }

    pdfGenrate() {
        let content = this.divcontent.nativeElement;
        // console.log(content.innerHTML)
        let printContents, popupWin;
        printContents = content.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=600px,width=600px');
        popupWin.document.open();
        popupWin.document.write(
            `<style>
            table{
              width:100%;
            }

            .tbl-content{
              overflow-x:auto;
              margin-top: 0px;
            }
            .tbl-content-header{
            }
            .tablestyle{
              border-collapse: collapse;
               border: 1px solid #ebeff5;
            }

            th{
              padding: 15px 10px;
              border: 1px solid #ebeff5;
            }
            td{
              padding: 10px;
              border: 1px solid #ebeff5;
              text-align:center;
            }
            tr:nth-child(even) {background-color: #f5f7fc;}
            tr:hover {background-color: #e6f3ff;}
            </style><body onload="window.print();">${printContents}</body>`
        );
        popupWin.document.close();
    }


    getPackingslipReportReprint(order_no:number,box_no:number){
        this.order_id=null
        this.getPackingslipreportdata(order_no,box_no)
        setTimeout(()=>{
            this.pdfGenrate()
        },800)
        this.showSelectBox=false
    }

    GetBOxId(order_no) {
        if(this.BoxNo[0].qty>0){
            this.getPackingslipreportdata(this.order_no,this.BoxNo[0].box_no);
            setTimeout(()=>{
                this.pdfGenrate()
            },500)

        }
        if (this.order_no == null || this.order_no == undefined) {
            this._toasterService.onError('error', 'Please Select order_no to Get box id')
        } else {
            try {
                this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.GetBoxId, {
                    order_no: order_no,
                    newBoxNo: 'Newboxno'
                })
                    .then(result => {
                        this.BoxNo = result as BoxIdModel[];
                        //console.log(this.BoxNo)
                    })
            } catch (e) {

            }
        }
    }

    scanItem() {
      if(this.BoxNo.length!>0 && this.BoxNo[0].condition.toLowerCase()=='false'){
          this._toasterService.onError('error','Before scan!Please get box no first')
      }else{
          const json = {
              dispatchOrder_no: this.DataTableDetail.order_no,
              SaleOrder_no: this.order_no,
              Barcode: parseInt(this.barcode.value),
              Box_no: this.BoxNo[0].box_no,
              created_by: this._encryptdecrypt.decrypt(localStorage.getItem('Belle_SSID'))
          }
          try {
              this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.ScanItem, json)
                  .then(result => {
                      this.itemDetail = result as itemModel[]
                      if (this.itemDetail[0].condition.toLowerCase() == 'true') {
                          this._toasterService.onSuccess('success', this.itemDetail[0].message)
                          this.barcode.setValue('')
                          this.BoxNo[0].qty += this.itemDetail[0].inbox_qty
                          this.shoWscanneditemlist(this.order_no)
                          this.showTotalScannedItemlist(this.DataTableDetail.order_no)
                      } else {
                          this._toasterService.onError('error', this.itemDetail[0].message)
                          // this.getPackingslipreportdata(this.order_no,this.BoxNo[0].box_no)
                          this.barcode.setValue('')
                          this.shoWscanneditemlist(this.order_no)
                          this.showTotalScannedItemlist(this.DataTableDetail.order_no)
                          this.BoxNo[0].qty +=0
                          // if (this.itemDetail[0].info == 'Scan') {
                          //     setTimeout(()=>{
                          //         this.pdfGenrate()
                          //     },400)
                          // }
                      }
                  })
          } catch (e) {

          }
      }
    }

    CompleteScanProcess(){
        var dialogConfig=this.dialogConfig.open(PristineConfirmDialogComponent)
        dialogConfig.componentInstance.title='Info'
        dialogConfig.componentInstance.confirmMessage="Are you sure!want to complete"
        dialogConfig.afterClosed().subscribe(result=>{
          if(result==true){
              try{
                  this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.CompleteScanProcess,{order_no:this.DataTableDetail.order_no})
                      .then(result=>{
                          console.log(result)
                          if(result[0].condition.toLowerCase()=='true'){
                              this._toasterService.onSuccess('success',result[0].message)
                              this.router.navigate(['/dispatch_order/create_dispatch_order'])
                          }else{
                              this._toasterService.onError('error',result[0].message)
                          }
                      })
              }catch (e) {

              }
          }
      })

 }
}




