import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {EncriptDecript} from "../../../../../../@pristinebase/Process/EncriptDecript";

import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";





@Component({
    selector: 'show_orderLine',
    templateUrl: './show_scanned_item.component.html',
    styleUrls: ['./show_scanned_item.component.scss']
})
export class show_scanned_itemComponent implements OnInit{
    loading:boolean=false;
    dataSource;
    displayedColumns:string[]=["order_no","item_code","box_no","scan_qty"];
    @ViewChild('TablePaginator', {static: true}) paginator:MatPaginator;
    @ViewChild('TableSort', {static: true}) sort:MatSort;
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<show_scanned_itemComponent>, public configRef:MatDialog,
        public webApiHttp:WebApiHttp, public _encryptdecrypt:EncriptDecript,
        private pristineToaster:PristineToaster, private  router:Router,
        @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder, private _toasterService:PristineToaster
        ) {}

    ngOnInit(): void {
       try{
           this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.ShowScanneditem+this.data.order_no)
               .then(result=>{
                   console.log(result)
                   this.dataSource=new  MatTableDataSource(result)
                   this.dataSource.paginator=this.paginator
                   this.dataSource.sort=this.sort
               })
       }catch (e) {

       }

    }

    cancle(){
        this.dialogRef.close()
    }



}
