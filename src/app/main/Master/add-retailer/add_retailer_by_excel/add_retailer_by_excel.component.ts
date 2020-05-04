import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {AllAreaModel, AllDistModel, AllStreetModel, BranchModel, salespersondatamodel, StateModel
} from "../../../../Model/AddSalespersonModel";
import {AddRetailerService} from "../add-retailer.service";
import {Observable} from "rxjs";
import * as XLSX from 'xlsx';
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {ThemePalette} from "@angular/material/core";



@Component({
    selector: 'add_retailer_by_excel',
    templateUrl: './add_retailer_by_excel.component.html',
    styleUrls: ['./add_retailer_by_excel.component.scss']
})
export class add_retailer_by_excelComponent implements OnInit{

    loading:boolean=false;
    file: File;
    currntDate=new Date();
    arrayBuffer: any;
    uploadedData: ExcelModel[];
    headerArray: string[];
    fileData:FormControl=new  FormControl();
    color: ThemePalette = 'warn';
    mode: 'indeterminate';
    value = 0;
    bufferValue = 75;
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<add_retailer_by_excelComponent>,
        public webApiHttp:WebApiHttp,public _encriptdecript:EncriptDecript,
        private pristineToaster:PristineToaster,
        @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,
        public _locationService:AddRetailerService,private _toasterService:PristineToaster
        ) {}

    ngOnInit(): void {



    }
    async incomingfile(event) {
        //this.progressbarshow = true;
        //this.progressValue = 20;
        this.value=20
        console.log(event)
        this.file = event.target.files[0];
        console.log(this.file.type);
        if (this.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || this.file.type == 'application/vnd.ms-excel') {
            var subscriberOfobservable = new Observable(observable => {
                try {
                    let fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        this.value=50
                        this.arrayBuffer = fileReader.result;
                        var data = new Uint8Array(this.arrayBuffer);
                        var arr = [];
                        this.value=75
                        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                        var bstr = arr.join("");
                        this.value=80
                        var workbook = XLSX.read(bstr, {type: "binary"});
                        var first_sheet_name = workbook.SheetNames[0];
                        var worksheet = workbook.Sheets[first_sheet_name];
                        console.log(XLSX.utils.sheet_to_json(worksheet, {raw: true}));
                        this.uploadedData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
                         this.arrangeDataForUi();
                    };
                    fileReader.readAsArrayBuffer(this.file);

                } catch (error) {
                    console.log(error);

                }
            });
            // await this.Upload();
            //this.validateUploadorNot = true;
            subscriberOfobservable.subscribe(result => {
                console.log("result", result);

            })
        } else {

        }
    }

    arrangeDataForUi() {
        try {
            this.headerArray = Object.keys(this.uploadedData[0]);
            this.value=100;
           if(this.value!=100){
               this._toasterService.onError('error','Required Column not found!Please Upload valid excel')
           }
        } catch (e) {
            console.log(e)
            // this.progressValue = 100;

        }
    }

    PostFileData() {
        var posteddataitems: Array<ExcelModel> = [];
        for (var i = 0; i < this.uploadedData.length; i++) {
            var json={
            salesmanid:this.uploadedData[i].salesmanid,
            firmName:this.uploadedData[i].firmName,
            Owner1Name:this.uploadedData[i].Owner1Name,
            Owner1Mobile:this.uploadedData[i].Owner1Mobile,
            Owner1Mobile2:this.uploadedData[i].Owner1Mobile2,
            Owner2Name:this.uploadedData[i].Owner2Name,
            Owner2Mobile:this.uploadedData[i].Owner2Mobile,
            Owner2Mobile2:this.uploadedData[i].Owner2Mobile2,
            Remark:this.uploadedData[i].Remark,
            gst:this.uploadedData[i].gst,
            Line1:this.uploadedData[i].Line1,
            Line2:this.uploadedData[i].Line2,
            State:this.uploadedData[i].State,
            District:this.uploadedData[i].District,
            Area:this.uploadedData[i].Area,
            Street:this.uploadedData[i].Street,
            Branch:this.uploadedData[i].Branch,
            Grade:this.uploadedData[i].Grade,
            Distributor:this.uploadedData[i].Distributor,
            CreatedBy:this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),
            };
            posteddataitems.push(json);
            console.log(posteddataitems)
        }
        const jsonvalue={
            retailer: posteddataitems
        }
        try{
            this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.AddretailerbyExcel,jsonvalue)
                .then(result=>{
                    console.log(result)
                    let response:Array<{condition:string;message:string}>=result
                    if(response[0].condition.toLowerCase()=='true'){
                        this._toasterService.onSuccess('success',response[0].message)
                        this.dialogRef.close();
                    }else{
                        this._toasterService.onError('error',response[0].message)
                        this.dialogRef.close();
                    }
                },err=>{console.log(err)})
        }catch (e) {
            console.log(e)
        }
    }
    cancle(){
        this.dialogRef.close()
    }

}
interface ExcelModel {
    firmName: string;
    Owner1Name: string;
    Owner1Mobile: string;
    Owner1Mobile2: string;
    Owner2Name: string;
    Owner2Mobile: string;
    Owner2Mobile2: string;
    Remark: string;
    gst: string;
    Line1: string;
    Line2: string;
    State: string;
    District: string;
    Area: string;
    Street: string;
    Branch: string;
    Grade: string;
    Distributor: string;
    salesmanid: number;
}
