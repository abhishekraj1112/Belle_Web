import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {getorderline} from "../../../../Model/OrderModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {PristineConfirmDialogComponent} from "../../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";



@Component({
    selector: 'show_orderLine',
    templateUrl: './show_orderLine.component.html',
    styleUrls: ['./show_orderLine.component.scss']
})
export class show_orderLineComponent implements OnInit{
    loading:boolean=false;
    OrderLine:Array<getorderline>=[]
    dataSource;
    displayedColumns:string[]=["art_no","brand","color","size","qty","action"];
    @ViewChild('TablePaginator', {static: true}) paginator:MatPaginator;
    @ViewChild('TableSort', {static: true}) sort:MatSort;
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<show_orderLineComponent>,public configRef:MatDialog,
        public webApiHttp:WebApiHttp,public _encryptdecrypt:EncriptDecript,
        private pristineToaster:PristineToaster,private  router:Router,
        @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder, private _toasterService:PristineToaster
        ) {}

    ngOnInit(): void {
        try{
          this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetOrderLine+this.data.order_no)
              .then(result=>{
                  if(result[0].condition.toLowerCase()=='true'){
                      this.OrderLine=result as getorderline[];
                      this.dataSource=new MatTableDataSource(this.OrderLine);
                      this.dataSource.paginator=this.paginator;
                      this.dataSource.sort=this.sort;
                  }else{
                      this._toasterService.onError('error','Data Not Found')
                  }
              },error=>{
                  this._toasterService.onError('error',error)
              })
        }catch (e) {
            this._toasterService.onError('error',e)
        }

    }
    cancle(){
        this.dialogRef.close()
    }
    addnewline(){
        this.router.navigate(['/order/add-order',{response:this._encryptdecrypt.encrypt(JSON.stringify(this.data))}])
        this.dialogRef.close()
    }
    deleteOrderLine(rowData:any){
        var dialog=this.configRef.open(PristineConfirmDialogComponent)
        dialog.componentInstance.title='Info';
        dialog.componentInstance.confirmMessage='Are you sure!you want to delete line';
        dialog.afterClosed().subscribe(result=>{
            if(result==true){
                try{
                    this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.DeleteOrderLine,{id:rowData.id})
                        .then(result=>{
                            if(result[0].condition.toLowerCase()=='true'){
                                this._toasterService.onSuccess('success','Line deleted')
                                this.ngOnInit()
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
