import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {Router} from "@angular/router";

@Component({
    selector: 'change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss']
})
export class changePasswordDialogComponent implements OnInit{
    hide:boolean=true; hide1:boolean=true; hide2:boolean=true
    user:FormGroup
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<changePasswordDialogComponent>, public configRef:MatDialog,
        public webApiHttp:WebApiHttp, public _encryptdecrypt:EncriptDecript,
        private pristineToaster:PristineToaster, private  router:Router,
        @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder, private _toasterService:PristineToaster
        ) {
        const passwordMatchValidator: ValidatorFn = (user: FormGroup): ValidationErrors | null => {
            if (user.get('newPassword').value === user.get('confrmPassword').value)
                return null;
            else
                return {passwordMismatch: true};
        };
        this.user=this.fb.group({
            oldPassword:[null,Validators.required],
            newPassword:[null,Validators.required],
            confrmPassword:[null,Validators.required]
        },{validator: passwordMatchValidator})
    }


    ngOnInit(): void {

    }
    get password() { return this.user.get('newPassword'); }
    get password2() { return this.user.get('confrmPassword'); }
    onPasswordInput() {
        if (this.user.hasError('passwordMismatch'))
            this.password2.setErrors([{'passwordMismatch': true}]);
        else
            this.password2.setErrors(null);
    }

    cancle(){
        this.dialogRef.close()
    }
   ChangePassword(){
        const  json={
            id:this.data.id,
            old_password:this.user.get("oldPassword").value,
            password:this.user.get("confrmPassword").value
        }
        try{
         this.webApiHttp.PostDataToServer(this.webApiHttp.ApiUrlArray.ChangeUserPassword,json)
             .then(result=>{
                 if(result[0].condition.toLowerCase()=='true'){
                     this._toasterService.onSuccess('success',result[0].message)
                     this.dialogRef.close()
                 }else{
                     this._toasterService.onError('error',result[0].message)
                     this.dialogRef.close()
                 }
             },error=>{
                 this._toasterService.onSuccess('error',error)
             })
        }catch (e) {
            this._toasterService.onSuccess('error',e)
        }
   }

}
