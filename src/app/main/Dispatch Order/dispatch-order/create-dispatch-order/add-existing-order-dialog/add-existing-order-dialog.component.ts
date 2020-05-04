import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {EncriptDecript} from "../../../../../../@pristinebase/Process/EncriptDecript";
import {Router} from "@angular/router";

@Component({
    selector: 'change-password-dialog',
    templateUrl: './add-existing-order-dialog.component.html',
    styleUrls: ['./add-existing-order-dialog.component.scss']
})
export class addExistingOrderDialogComponent implements OnInit{
    hide:boolean=true; hide1:boolean=true; hide2:boolean=true
    user:FormGroup
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<addExistingOrderDialogComponent>, public configRef:MatDialog,
        public webApiHttp:WebApiHttp, public _encryptdecrypt:EncriptDecript,
        private pristineToaster:PristineToaster, private  router:Router,
        @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder, private _toasterService:PristineToaster
        ) {}


    ngOnInit(): void {


    }



}
