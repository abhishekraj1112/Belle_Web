import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {Assign_usernameService} from "./assign_username.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {Router} from "@angular/router";
import {BranchModel} from "../../../Model/AddSalespersonModel";
import {distributionModel, GetUserListModel, salespersonModel, UserRoleModel} from "../../../Model/UserSetupModel";
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {changePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {PristineConfirmDialogComponent} from "../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-assign_daywisearea_to_salesman',
  templateUrl: './assign_username.component.html',
  styleUrls: ['./assign_username.component.scss']
})
export class Assign_usernameComponent implements OnInit{
  dataSource;
   SalesmanDetails:Array<salespersonModel>=[]
    DistributorList:Array<distributionModel>=[];
    AllBranchDetail:Array<BranchModel>=[];
    GetUserRoleDetail:Array<UserRoleModel>=[]
    UserList:Array<GetUserListModel>=[];
    displayedColumns: string[] = ['type','name','user_name','password','action'];
    branch:string;role:string;name:string;hide = true;
    UserForm:FormGroup;
    visible=true
      @ViewChild('Paginator',{static:true}) paginator:MatPaginator;
      @ViewChild('Sort',{static:true}) sort:MatSort;

  constructor(
      public WebApiHttp:WebApiHttp,public fb:FormBuilder,private spinner:NgxSpinnerService,
      public _locationService:Assign_usernameService, public _encriptdecript:EncriptDecript,
      public _toasterService:PristineToaster, public dailogRef:MatDialog, private router:Router)
  {
    // this.dataSource = new MatTableDataSource<Statemodel>(this.AllState)
   this.AllBranchDetail=this._locationService.AllBranchDetail;
      this.GetUserRoleDetail=this._locationService.GetUserRoleDetail;
      const passwordMatchValidator: ValidatorFn = (UserForm: FormGroup): ValidationErrors | null => {
      if (UserForm.get('password').value === UserForm.get('confirmpassword').value)
          return null;
      else
          return {passwordMismatch: true};
  };
      this.UserForm=this.fb.group({
          role:[null],
          branch:[null],
          name:[null],
          name2:[null,[Validators.required]],
          userName:[null,[Validators.required]],
          password:[null,[Validators.required]],
          confirmpassword:[null,[Validators.required]],
      },{validator: passwordMatchValidator})
  }



  ngOnInit() {
      // this.dataSource=new  MatTableDataSource(this.MarketList)
      // this.dataSource.paginator=this.paginator
      // this.dataSource.sort=this.sort
  }
  GetuserList(){
      this.UserForm.get('branch').setValue('')
      this.UserForm.get('name').setValue('')
      try {
          this.spinner.show();
          this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetUserList+this.UserForm.get('role').value)
              .then(result=>{
                  console.log(result)
                      if(result[0].condition.toLowerCase()=='true'){
                          this.UserList=result as GetUserListModel[];
                          this.dataSource=new  MatTableDataSource(this.UserList)
                          this.dataSource.paginator=this.paginator
                          this.dataSource.sort=this.sort
                          this.spinner.hide();
                      }else{
                          this.dataSource=[];
                          this._toasterService.onError('error',result[0].message);
                          this.spinner.hide();
                      }

              },error=>{
                  this._toasterService.onError('error',error);
                  this.spinner.hide();
              })
      }catch (e) {
          this._toasterService.onError('error',e);
          this.spinner.hide();
      }
  }

    get password() { return this.UserForm.get('password'); }
    get password2() { return this.UserForm.get('confirmpassword'); }
    onPasswordInput() {
        if (this.UserForm.hasError('passwordMismatch'))
            this.password2.setErrors([{'passwordMismatch': true}]);
        else
            this.password2.setErrors(null);
    }

  GetSalesman(){
      if(this.UserForm.get('role').value!='' && this.UserForm.get('role').value=='salesperson') {
          this._locationService.GetSalesman(this.UserForm.get('role').value,this.UserForm.get('branch').value).then(result => {
              if (result[0].condition.toLowerCase() == 'true') {
                  this.SalesmanDetails = result as salespersonModel[];
              } else {
                  this._toasterService.onError('error', result[0].message)
              }
          })
      }else if(this.UserForm.get('role').value!='' && this.UserForm.get('role').value=='distributor'){
          this._locationService.GetDistributor(this.UserForm.get('branch').value).then(result => {
              if (result[0].condition.toLowerCase() == 'true') {
                  this.DistributorList = result as distributionModel[];
              } else {
                  this._toasterService.onError('error', result[0].message)
              }
          })
      }
  }

  createUserpass(){
          if(this.UserForm.get('role').value!='salesman'|| this.UserForm.get('role').value!='distributor'){
              var name=this.UserForm.get('name2').value
          }else{
              var name=this.UserForm.get('name').value
          }

      const json={
          role:this.UserForm.get('role').value,
          location:this.UserForm.get('branch').value,
          name:name,
          user_name:this.UserForm.get('userName').value,
          password:this.UserForm.get('confirmpassword').value
      }
      try{
          this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.Createuserpassword,json)
              .then(result=>{
                  let response:Array<{condition:string,message:string}>=result
                  if(response[0].condition.toLowerCase()=='true'){
                      this._toasterService.onSuccess('success',response[0].message)
                      this.UserForm.get('branch').reset();
                      this.UserForm.get('name').reset();
                      this.UserForm.get('name2').reset();
                      this.UserForm.get('userName').reset();
                      this.UserForm.get('password').reset();
                      this.UserForm.get('confirmpassword').reset();
                      this.GetuserList()
                  }else{
                      this._toasterService.onError('error',response[0].message)
                  }
              })
      }catch (e) {

      }
  }
    deleteUser(data:any){
        var dialogConfig=this.dailogRef.open(PristineConfirmDialogComponent)
        dialogConfig.componentInstance.title='Info'
        dialogConfig.componentInstance.confirmMessage='Are you sure!You want to delete user'
            dialogConfig.afterClosed().subscribe(result=>{
                if(result==true){
                    try{
                        this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteUser,{id:data.id})
                            .then(result=>{
                                if(result[0].condition.toLowerCase()=='true'){
                                    this._toasterService.onSuccess('success',result[0].message)
                                    this.GetuserList()
                                }else{
                                    this._toasterService.onError('error',result[0].message)
                                }
                            })
                    }catch (e) {

                    }

                }
            })
    }
  changePassowrd(data){
      var config=this.dailogRef.open(changePasswordDialogComponent,{
          data:data
      })
      config.afterClosed().subscribe(result=>{
          this.GetuserList()
      })
  }


}
