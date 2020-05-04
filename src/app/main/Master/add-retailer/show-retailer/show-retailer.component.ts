import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {ShowRetailerService} from "./show-retailer.service";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {AllAreaModel, AllDistModel, AllStreetModel, BranchModel, StateModel} from "../../../../Model/AddSalespersonModel";
import {MatDialog} from "@angular/material/dialog";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {Router} from "@angular/router";
import {retailerDetailsModel} from "../../../../Model/DistributorsModel";
import {LocalDataSource} from "ng2-smart-table";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-add-retailer',
  templateUrl: './show-retailer.component.html',
  styleUrls: ['./show-retailer.component.scss']
})
export class ShowRetailerComponent implements OnInit{
    //dataSource;
    retailerdetail = {
        actions: {
            add: false,
            edit: false,
            delete:false,
            position: 'right'

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
            editButtonContent: '<i class="nb-edit">add</i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-close">delete</i>',
            confirmDelete: true,
        },
        columns: {
            firm_name: {
                title: 'Firm name',
                type: 'string',
                filter: true
            },
            name: {
                title: 'Name',
                type: 'string',
                filter: true
            },
            gst: {
                title: 'Gst No.',
                type: 'string',
                filter: true
            },
            contact_no: {
                title: 'Contact No.',
                type: 'string',
                filter: true
            },
            address: {
                title: 'Address',
                type: 'string',
                filter: true
            },
            branch: {
                title: 'Branch',
                type: 'string',
                filter: true
            },
            grade: {
                title: 'Grade',
                type: 'string',
                filter: true
            },
            distributor: {
                title: 'Distributor',
                type: 'string',
                filter: true
            },


        },

    };
    datasource: LocalDataSource = new LocalDataSource();
    @ViewChild('Paginator', {static: true}) paginator: MatPaginator;
    @ViewChild('Sort', {static: true}) sort: MatSort;
    AllBranchDetail:Array<BranchModel>=[];
    RetailerDetails:Array<retailerDetailsModel>
    branch:FormControl=new FormControl();
  constructor(
      private WebApiHttp:WebApiHttp,
        private  router:Router,
      private spinner: NgxSpinnerService,
      public _toasterService:PristineToaster,
      private _encriptdecript:EncriptDecript)
  {

  }


  ngOnInit() {
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetAllBranch).then(result=>{
                this.AllBranchDetail=result as BranchModel[];
            })
        }catch (e) {

        }
  }
    GetRetailr(branch:string){
        this.spinner.show()
        try{
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetRetailerDetails+branch).then(result=>{
                console.log(result)
                if(result[0].condition.toLowerCase()=='true'){
                    this.RetailerDetails=result as retailerDetailsModel[];
                    this.datasource.load(this.RetailerDetails)
                    this.spinner.hide()
                }else{
                    this._toasterService.onError('error',result[0].message)
                    this.datasource.load([])
                    this.spinner.hide()
                }

            },err=>{
                this._toasterService.onError('error',err)
                this.spinner.hide()
            })
        }catch (e) {
            this._toasterService.onError('error',e)
            this.spinner.hide()
        }

    }
   onClickNew(){
      this.router.navigate(['/master/addretailer'])
   }

}
