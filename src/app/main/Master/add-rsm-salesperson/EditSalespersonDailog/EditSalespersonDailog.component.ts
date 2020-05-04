import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {AllAreaModel, AllDistModel, AllStreetModel, BranchModel, salespersondatamodel, StateModel
} from "../../../../Model/AddSalespersonModel";
import {AddRsmSalespersonService} from "../add-rsm-salesperson.service";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
    selector: 'editSalespersonDailog-dialog',
    templateUrl: './editSalespersonDailog.component.html',
    styleUrls: ['./editSalespersonDailog.component.scss']
})
export class editSalespersonDailogComponent implements OnInit{
    EditSalesperson: FormGroup;
    loading:boolean=false;
    state;dist;area;
    AllBranchDetail:Array<BranchModel>=[]
    AllState:Array<StateModel>=[]
    AllDist:Array<AllDistModel>=[]
    AllArea:Array<AllAreaModel>=[]
    Allstreet:Array<AllStreetModel>=[]
    image:File;
    data:any;
    uploadImage(event){
        this.image = event.target.files[0];
    }
    filetype:string;
    constructor(
        private _formBuilder: FormBuilder,
        private _encryptdecrypt:EncriptDecript,
        private route:ActivatedRoute,
        public webApiHttp:WebApiHttp,
        private pristineToaster:PristineToaster,
        private fb:FormBuilder,
        private router:Router,
        private spinner:NgxSpinnerService,
        public _locationService: AddRsmSalespersonService,private _toasterService:PristineToaster
        ) {

        this._locationService.GetAllBranch().then(result=>{
            this.AllBranchDetail=result as BranchModel[];
        })
        this.EditSalesperson = this.fb.group({
            type: [null, Validators.required],
            branch:[null, Validators.required],
            first_name:[null, Validators.required],
            last_name:[null],
            mobile:[null, [Validators.required,Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
            mobile2:[null],
            image:[null],
            remark:[null],
            line1:[null, Validators.required],
            line2:[null],
            state:[null, Validators.required],
            district:[null, Validators.required],
            area:[null, Validators.required],
            street:[null, Validators.required],
            country:[null]
        });
    }
  flag:any
    ngOnInit(): void {

        this.flag=this.route.snapshot.paramMap.get('flag')
        console.log(this.flag)
        if(this.flag=='view'){
            this.data = JSON.parse(this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('response')));
            this.filetype = this.data.image_url.replace(/^.*[\\\/]/, '')
            this.EditSalesperson.get('type').setValue(this.data.type)
            this.EditSalesperson.get('type').disable();
            this.EditSalesperson.get('branch').setValue(this.data.branch)
            this.EditSalesperson.get('branch').disable();
            this.EditSalesperson.get('first_name').setValue(this.data.first_name)
            this.EditSalesperson.get('first_name').disable();
            this.EditSalesperson.get('last_name').setValue(this.data.last_name)
            this.EditSalesperson.get('last_name').disable();
            this.EditSalesperson.get('mobile').setValue(this.data.mobile)
            this.EditSalesperson.get('mobile2').setValue(this.data.mobile2)
            this.EditSalesperson.get('remark').setValue(this.data.remark)
            this.EditSalesperson.get('line1').setValue(this.data.line1)
            this.EditSalesperson.get('line2').setValue(this.data.line2)
            this.EditSalesperson.get('state').setValue(this.data.state)
            this.EditSalesperson.get('district').setValue(this.data.district)
            this.EditSalesperson.get('area').setValue(this.data.area)
            this.EditSalesperson.get('street').setValue(this.data.street)
            this.EditSalesperson.get('country').setValue(this.data.country)

        }
        this.GetAllState()
    }
    urls :string;
    onSelectedFile(event) {
        let files = event.target.files;
        if (files) {
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.urls=e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
        this.image = event.target.files;
    }
    cancle(){
        //this.dialogRef.close();
    }
    GetAllState(){
        this._locationService.GetAllState().then(result=>{
            this.AllState=result as  StateModel[];
            this.GetAllDist(this.EditSalesperson.get('state').value)
            if(this.flag=='view'){
                this.EditSalesperson.get('district').setValue(this.data.district)
            }
        })
    }
    GetAllDist(state_id){
       this.EditSalesperson.get('district').setValue('')
        this.EditSalesperson.get('area').setValue('')
        this.EditSalesperson.get('street').setValue('')
        for(let i=0;i<this.AllState.length;i++){
            if(state_id==this.AllState[i].state){
                var  state=this.AllState[i].id;
                break;
            }
        }
        this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllDist+state).then(result=>{
            this.AllDist=result as  AllDistModel[];
            this.GetAllArea(this.EditSalesperson.get('district').value)
            if(this.flag=='view') {
                this.EditSalesperson.get('area').setValue(this.data.area)
            }

        });

    }
    GetAllArea(dist_id){
        this.EditSalesperson.get('area').setValue('')
        for(let i=0;i<this.AllDist.length;i++){
            if(dist_id==this.AllDist[i].district_name){
                var  dist=this.AllDist[i].dist_Id;
                break;
            }
        }
        this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllArea+dist).then(result=>{
            this.AllArea=result as  AllAreaModel[];
            this.GetAllStreet(this.EditSalesperson.get('area').value)
            if(this.flag=='view') {
                this.EditSalesperson.get('street').setValue(this.data.street)
            }
        })
    }
    GetAllStreet(area_id){
        this.EditSalesperson.get('street').setValue('')
        for(let i=0;i<this.AllArea.length;i++){
            if(area_id==this.AllArea[i].area_name){
                var  area=this.AllArea[i].area_Id;
                break;
            }
        }
        this.webApiHttp.GetDataFromServer(this.webApiHttp.ApiUrlArray.GetAllStreet+area).then(result=>{
            this.Allstreet=result as  AllStreetModel[];
        })
    }
    UpdateSalesperson(){
        this.spinner.show();
        var formData=new  FormData();
        formData.append('Id',this.data.id);
        formData.append('flag','update');
        formData.append('Type',this.EditSalesperson.get('type').value);
        formData.append('Branch',this.EditSalesperson.get('branch').value);
        formData.append('FirstName',this.EditSalesperson.get('first_name').value);
        formData.append('LastName',this.EditSalesperson.get('last_name').value);
        formData.append('Mobile',(this.EditSalesperson.get('mobile').value=='' || this.EditSalesperson.get('mobile').value==null || this.EditSalesperson.get('mobile').value==undefined)?0:this.EditSalesperson.get('mobile').value);
        formData.append('Mobile2',(this.EditSalesperson.get('mobile2').value=='' || this.EditSalesperson.get('mobile2').value==null || this.EditSalesperson.get('mobile2').value==undefined)?0:this.EditSalesperson.get('mobile2').value);
        formData.append('ImageUrl',this.image);
        formData.append('Remark',this.EditSalesperson.get('remark').value);
        formData.append('Line1',this.EditSalesperson.get('line1').value);
        formData.append('Line2',this.EditSalesperson.get('line2').value);
        formData.append('State',this.EditSalesperson.get('state').value);
        formData.append('District',this.EditSalesperson.get('district').value);
        formData.append('Area',this.EditSalesperson.get('area').value);
        formData.append('Street',this.EditSalesperson.get('street').value);
        formData.append('Country',this.EditSalesperson.get('country').value);
        try {
            this.webApiHttp.Post(this.webApiHttp.ApiUrlArray.AddSalesperson,formData)
                .then(result=>{
                    //console.log(result)
                    let response:Array<{condition:string;message:string}>=result
                    if(response[0].condition.toLowerCase()=='true'){
                        this._toasterService.onSuccess('success',response[0].message)
                        // this.dialogRef.close();
                        this.router.navigate(['/master/add-salesperson'])
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

    AddSalesperson(){
        this.spinner.show();
        var formData=new  FormData();
        // formData.append('Id',null);
        formData.append('flag','insert');
        formData.append('Type',this.EditSalesperson.get('type').value);
        formData.append('Branch',this.EditSalesperson.get('branch').value);
        formData.append('FirstName',this.EditSalesperson.get('first_name').value);
        formData.append('LastName',this.EditSalesperson.get('last_name').value);
        formData.append('Mobile',(this.EditSalesperson.get('mobile').value=='' || this.EditSalesperson.get('mobile').value==null || this.EditSalesperson.get('mobile').value==undefined)?0:this.EditSalesperson.get('mobile').value);
        formData.append('Mobile2',(this.EditSalesperson.get('mobile2').value=='' || this.EditSalesperson.get('mobile2').value==null || this.EditSalesperson.get('mobile2').value==undefined)?0:this.EditSalesperson.get('mobile2').value);
        formData.append('ImageUrl',this.image);
        formData.append('Remark',this.EditSalesperson.get('remark').value);
        formData.append('Line1',this.EditSalesperson.get('line1').value);
        formData.append('Line2',this.EditSalesperson.get('line2').value);
        formData.append('State',this.EditSalesperson.get('state').value);
        formData.append('District',this.EditSalesperson.get('district').value);
        formData.append('Area',this.EditSalesperson.get('area').value);
        formData.append('Street',this.EditSalesperson.get('street').value);
        formData.append('Country',this.EditSalesperson.get('country').value);
        try {
            this.webApiHttp.Post(this.webApiHttp.ApiUrlArray.AddSalesperson,formData)
                .then(result=>{
                    let response:Array<{condition:string;message:string}>=result
                    if(response[0].condition.toLowerCase()=='true'){
                        this._toasterService.onSuccess('success',response[0].message)
                        this.router.navigate(['/master/add-salesperson'])
                        this.spinner.hide();
                    }else{
                        this._toasterService.onError('error',response[0].message)
                        this.spinner.hide();
                    }
                },err=>{
                    this._toasterService.onError('error',err);
                    this.spinner.hide();
                })
        }catch (e) {
            this._toasterService.onError('error',e);
            this.spinner.hide();
        }
    }

}

