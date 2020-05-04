import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {EncriptDecript} from "../../../../../../@pristinebase/Process/EncriptDecript";

import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {show_sales_orderLineComponent} from "../show_sales_orderLine/show_sales_orderLine.component";
import {
    packingSlipItemDetailModel,
    packingSlipitemsizemodel, Picklistitemdetailmodel,
    Picklistitemsizemodel, Picklistretailerdetailmodel
} from "../../../../../Model/DispatchOrderModel";
import {isObject} from "util";




@Component({
    selector: 'show_orderLine',
    templateUrl: './show_dispatch_orderLine.component.html',
    styleUrls: ['./show_dispatch_orderLine.component.scss']
})
export class show_dispatch_orderLineComponent implements OnInit{
    loading:boolean=false;
    dataSource;
    Item_DetailList: Array<Picklistitemdetailmodel> = [];
    Item_StyleList: Array<Picklistitemsizemodel> = [];
    retailerDetail:Array<Picklistretailerdetailmodel>=[];
    TotalItemStyle: Array<number> = [];
    displayedColumns:string[]=["order_no","retailer","qty","action"];
    @ViewChild('content', {static: true}) divcontent: ElementRef;
    @ViewChild('TablePaginator', {static: true}) paginator:MatPaginator;
    @ViewChild('TableSort', {static: true}) sort:MatSort;
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<show_dispatch_orderLineComponent>, public configRef:MatDialog,
        public webApiHttp:WebApiHttp, public _encryptdecrypt:EncriptDecript,
        private pristineToaster:PristineToaster, private  router:Router,
        @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder, private _toasterService:PristineToaster
        ) {}

    ngOnInit(): void {
       try{
           this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.ShowDispatchedOrderline+this.data.order_no)
               .then(result=>{
                   this.dataSource=new  MatTableDataSource(result)
                   this.dataSource.paginator=this.paginator
                   this.dataSource.sort=this.sort
               })
       }catch (e) {

       }

    }

    showSalesorderLine(salesData){
       var dialog=this.configRef.open(show_sales_orderLineComponent,{
           data:salesData.order_no
       })
    }

    cancle(){
        this.dialogRef.close()
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

    PickListreportdata(data){
        try{
            this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetPickListReport+data.order_no)
                .then(result=>{
                    this.TotalItemStyle = [];
                    if (isObject(result) && result.condition.toLowerCase() == 'true') {
                        this.Item_DetailList = result.itemDetail;
                        this.Item_StyleList = result.itemSize;
                        this.retailerDetail=result.retailerDetail;
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
                        setTimeout(()=>{
                            this.pdfGenrate()
                        },500)
                    }
                })
        }catch (e) {

        }
    }

    getCalculatedQty(ParentData:Picklistitemdetailmodel, ItemData: number) {
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

    getRowWiseTotal(ParentData: Picklistitemdetailmodel) {
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
            var ParentData: Picklistitemdetailmodel = this.Item_DetailList[j];
            for (let i = 0; i < this.Item_StyleList.length; i++) {
                if (ParentData.item_group == this.Item_StyleList[i].item_group && ParentData.cup_size == this.Item_StyleList[i].cup_size && ParentData.color == this.Item_StyleList[i].color) {
                    sumOfqty += this.Item_StyleList[i].qty;
                }
            }
        }
        return sumOfqty;
    }



}
