import {AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {AddRsmSalespersonService} from "./add-rsm-salesperson.service";
import { BranchModel, salespersondatamodel, StateModel} from "../../../Model/AddSalespersonModel";
import {MatDialog} from "@angular/material/dialog";
import {PristineConfirmDialogComponent} from "../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";


@Component({
  selector: 'app-add-rsm-salesperson',
  templateUrl: './add-rsm-salesperson.component.html',
  styleUrls: ['./add-rsm-salesperson.component.scss']
})
export class AddRsmSalespersonComponent implements OnInit {
    dataSource;
    AllBranchDetail:Array<BranchModel>=[]
    showSalespersonData:Array<salespersondatamodel>=[]
    type1;branch1
    image:File;
    displayColumn:string[]=["name","branch","state","district","area","street","Edit","Delete"]
    @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
    @ViewChild(MatPaginator,{static:true}) sort:MatSort;
    constructor(
        public WebApiHttp: WebApiHttp,
        public _locationService: AddRsmSalespersonService,
        public _toasterService: PristineToaster,private router:Router,private spinner: NgxSpinnerService,
        private composeDialog:MatDialog,public  fb:FormBuilder,private _encryptdecrypt:EncriptDecript) {
        this.dataSource=new  MatTableDataSource<salespersondatamodel>(this.showSalespersonData);
        this.AllBranchDetail=this._locationService.AllBranch
    }

    ngOnInit() {
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

    GetSalepersonDetail(){
        this.spinner.show();
     try{
         this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetSalepersonDetail+this.type1+'/'+this.branch1)
             .then(result=>{
                 this.showSalespersonData=result as  salespersondatamodel[];
                 if(this.showSalespersonData.length>0){
                     this.dataSource=new  MatTableDataSource<salespersondatamodel>(this.showSalespersonData);
                     this.dataSource.paginator= this.paginator;
                     this.dataSource.sort=this.sort;
                     this.spinner.hide();
                 }else{
                     this._toasterService.onError('error','Data Not Found')
                     this.type1=null;
                     this.branch1=null;
                     this.spinner.hide();
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

    EditDetail(data:any) {
        this.router.navigate(['/master/edit-salesperson',{response:this._encryptdecrypt.encrypt(JSON.stringify(data)),flag:'view'}])
    }

    onClickNew(){
        this.router.navigate(['/master/edit-salesperson',{response:this._encryptdecrypt.encrypt(JSON.stringify('none')),flag:'insert'}])
    }

    deleteSaleperson(data:any){

        const dialogRef=this.composeDialog.open(PristineConfirmDialogComponent,{})
        dialogRef.componentInstance.title='Info'
        dialogRef.componentInstance.confirmMessage='Do you want to delete'+' '+data.type+' '+data.name;
        dialogRef.afterClosed().subscribe(result=>{
            if(result==true){
                this.spinner.show()
                const json={
                    Id:data.id,
                    Type:data.type,
                }
                try {
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteSaleperson,json)
                        .then(result=>{
                            let response:Array<{condition:string,message:string}>=result;
                            if(response[0].condition.toLowerCase()=='true'){
                                this._toasterService.onSuccess('success',response[0].message)
                                this.GetSalepersonDetail();
                                this.spinner.hide();
                            }else{
                                this._toasterService.onError('error',response[0].message)
                                this.spinner.hide();
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
        })

    }
}
