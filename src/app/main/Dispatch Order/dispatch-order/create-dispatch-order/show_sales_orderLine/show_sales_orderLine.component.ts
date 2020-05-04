import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../../@pristinebase/Process/WebApiHttp.service";

import {getorderline} from "../../../../../Model/OrderModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";



@Component({
    selector: 'show_orderLine',
    templateUrl: './show_sales_orderLine.component.html',
    styleUrls: ['./show_sales_orderLine.component.scss']
})
export class show_sales_orderLineComponent implements OnInit{
    loading:boolean=false;
    OrderLine:Array<getorderline>=[]
    dataSource;
    displayedColumns:string[]=["art_no","brand","color","size","qty","action"];
    @ViewChild('TablePaginator', {static: true}) paginator:MatPaginator;
    @ViewChild('TableSort', {static: true}) sort:MatSort;
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<show_sales_orderLineComponent>, public configRef:MatDialog,
        public webApiHttp:WebApiHttp,
        private  router:Router,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
        try{
          this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetOrderItemdetail+this.data)
              .then(result=>{
                  console.log(result)
                  this.OrderLine=result as getorderline[];
                  if(!(this.OrderLine==[])){
                      this.dataSource=new MatTableDataSource(this.OrderLine);
                      this.dataSource.paginator=this.paginator;
                      this.dataSource.sort=this.sort;
                  }

              })
        }catch (e) {

        }

    }
    cancle(){
        this.dialogRef.close()
    }



}
