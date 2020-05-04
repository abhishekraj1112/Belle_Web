import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {AddRetailerService} from "./add-retailer.service";
import {AllArea, AllDist, AreaDetail, DistModel, Statemodel, streetDetail} from "../../../Model/LocationModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {LocationInfoService} from "../../../../@pristinebase/services/location-info.service";
import {AllAreaModel, AllDistModel, AllStreetModel, BranchModel, StateModel} from "../../../Model/AddSalespersonModel";
import {PristineConfirmDialogComponent} from "../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {add_retailer_by_excelComponent} from "./add_retailer_by_excel/add_retailer_by_excel.component";
import {Router} from "@angular/router";
import {retailerDetailsModel} from "../../../Model/DistributorsModel";
import {LocalDataSource} from "ng2-smart-table";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-add-retailer',
  templateUrl: './add-retailer.component.html',
  styleUrls: ['./add-retailer.component.scss']
})
export class AddRetailerComponent implements OnInit{
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
    FirmmDetail: FormGroup;
    FirmAddress: FormGroup;
    Retailer:FormGroup;
    searchfirmName:string=''
    retailerImage:Array<File>=[];
    state;dist;area;branch
    AllBranchDetail:Array<BranchModel>=[];
    AllState:Array<StateModel>=[];
    AllDist:Array<AllDistModel>=[];
    AllArea:Array<AllAreaModel>=[];
    Allstreet:Array<AllStreetModel>=[];
    RetailerDetails:Array<retailerDetailsModel>
    Allsalesman:Array<{id:number,salesman:string}>=[]
    BranchWiseDistributors:Array<{id:number,firm_name:string,branch:string}>=[]
    grade:string[]=["A+","A","B","C","D"]
  constructor(
              public WebApiHttp:WebApiHttp,
              public _locationService:AddRetailerService,public composeDialog:MatDialog,
              public retailerservice:AddRetailerService,private  router:Router,private spinner: NgxSpinnerService,
              public _toasterService:PristineToaster,public fb:FormBuilder,private _encriptdecript:EncriptDecript)
  {
     this.FirmmDetail=this.fb.group({
        firm_name:[null,Validators.required],
        name:[null,Validators.required],
        mobile:[null, [Validators.required,Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
        mobile2:[null, [Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
        nameOwner2:[null],
        MobileOwner2:[null, [Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
        Mobile2Owner2:[null, [Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
        remark:[null],
        gst:[null],

         })
     this.FirmAddress=this.fb.group({
        line1:[null, Validators.required],
        line2:[null],
        state:[null, Validators.required],
        district:[null, Validators.required],
        area:[null, Validators.required],
        street:[null, Validators.required],
    })
     this.Retailer=this.fb.group({
          branch:[null, Validators.required],
          grade:[null, Validators.required],
          distributor:[null, Validators.required],
          salesman:[null, Validators.required],
      })
      this.AllState=this._locationService.AllState
      this.AllBranchDetail=this._locationService.AllBranchDetail
  }

    urls :Array<string>=[];
    onSelectedFile(event) {
        this.urls = [];
        let files = event.target.files;
        if (files) {
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.urls.push(e.target.result);
                }
                reader.readAsDataURL(file);
            }
        }

        this.retailerImage = event.target.files;
    }


  ngOnInit() {
  }

    GEtSalesman(branch){
        const type='salesperson'
      this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetSalesman+branch+'/'+type).then(result=>{
          this.Allsalesman=result ;
          this.GetDistributors(branch)
      })
    }
    GetDistributors(branch){
      this.retailerservice.GetData(this.WebApiHttp.ApiUrlArray.GetDistributors,branch).then(result=>{
          this.BranchWiseDistributors=result ;
      })
    }
    GetAllDist(state_id){
        this._locationService.GetAllDist(this.WebApiHttp.ApiUrlArray.GetAllDist,state_id).then(result=>{
            this.AllDist=result as  AllDistModel[];
            if(!(this.AllDist.length>0)){
                var configRef=this.composeDialog.open(PristineConfirmDialogComponent)
                configRef.componentInstance.title='Info'
                configRef.componentInstance.confirmMessage='These state does not contain any district ! Please Add district first in "ADD Location" tab'
                configRef.afterClosed().subscribe(result=>{
                    if(result==true){
                        this.router.navigateByUrl('/master/add-location')
                    }
                })
            }
        })
    }

    GetAllArea(dist_id){
        this._locationService.GetArea(this.WebApiHttp.ApiUrlArray.GetAllArea,dist_id).then(result=>{
            this.AllArea=result as  AllAreaModel[];
            if(!(this.AllArea.length>0)){
                var configRef=this.composeDialog.open(PristineConfirmDialogComponent)
                configRef.componentInstance.title='Info'
                configRef.componentInstance.confirmMessage='These district does not contain any area ! Please Add area first in "ADD Location" tab'
                configRef.afterClosed().subscribe(result=>{
                    if(result==true){
                        this.router.navigateByUrl('/master/add-location')
                    }
                })
            }
        })
    }

    GetAllStreet(area_id){
        this._locationService.GetArea(this.WebApiHttp.ApiUrlArray.GetAllStreet,area_id).then(result=>{
            this.Allstreet=result as  AllStreetModel[];
            if(!(this.Allstreet.length>0)){
                var configRef=this.composeDialog.open(PristineConfirmDialogComponent)
                configRef.componentInstance.title='Info'
                configRef.componentInstance.confirmMessage='These area does not contain any street name ! Please Add street first in "ADD Location" tab'
                configRef.afterClosed().subscribe(result=>{
                    if(result==true){
                        this.router.navigateByUrl('/master/add-location')
                    }
                })
            }
        })
    }

    Addretailer(){
        this.spinner.show();
      const formData=new  FormData();
        formData.append('firmName',this.FirmmDetail.get('firm_name').value)
        formData.append('Owner1Name',this.FirmmDetail.get('name').value)
        formData.append('Owner1Mobile',this.FirmmDetail.get('mobile').value)
        formData.append('Owner1Mobile2',(this.FirmmDetail.get('mobile2').value=='' || this.FirmmDetail.get('mobile2').value==null || this.FirmmDetail.get('mobile2').value==undefined)?0:this.FirmmDetail.get('mobile2').value)
        formData.append('Owner2Name',this.FirmmDetail.get('nameOwner2').value)
        formData.append('Owner2Mobile',(this.FirmmDetail.get('MobileOwner2').value=='' ||this.FirmmDetail.get('MobileOwner2').value==null || this.FirmmDetail.get('MobileOwner2').value==undefined)?0:this.FirmmDetail.get('MobileOwner2').value)
        formData.append('Owner2Mobile2',(this.FirmmDetail.get('Mobile2Owner2').value=='' ||this.FirmmDetail.get('Mobile2Owner2').value==null || this.FirmmDetail.get('Mobile2Owner2').value==undefined)?0:this.FirmmDetail.get('Mobile2Owner2').value)
        formData.append('Remark',this.FirmmDetail.get('remark').value)
        formData.append('gst',this.FirmmDetail.get('gst').value)
        formData.append('Line1',this.FirmAddress.get('line1').value)
        formData.append('Line2',this.FirmAddress.get('line2').value)
        formData.append('State',this.FirmAddress.get('state').value)
        formData.append('District',this.FirmAddress.get('district').value)
        formData.append('Area',this.FirmAddress.get('area').value)
        formData.append('Street',this.FirmAddress.get('street').value)
        formData.append('Branch',this.Retailer.get('branch').value)
        formData.append('Grade',this.Retailer.get('grade').value)
        formData.append('Distributor',this.Retailer.get('distributor').value)
        formData.append('salesmanid',this.Retailer.get('salesman').value)
        Array.from(this.retailerImage).forEach(f => {
            formData.append('ImageUrl', f);
        });
        formData.append('CreatedBy',this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')))

        try {
            this.WebApiHttp.Post(this.WebApiHttp.ApiUrlArray.AddRetailer,formData)
                .then(result=>{
                    let response:Array<{condition:string,message:string}>=result
                    if(response[0].condition.toLowerCase()=='true'){
                        this._toasterService.onSuccess('success',response[0].message)
                        this.spinner.hide();
                        this.router.navigate(['/master/show-retailer'])
                        this.urls = [];

                    }else {
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

  AddRetailerByExcel(){
        var configRef=this.composeDialog.open(add_retailer_by_excelComponent)
  }

}
