import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PristineConfigService} from '@pristinebase/services/config.service';
import {pristineAnimations} from '@pristinebase/animations';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {Router} from "@angular/router";
import {Login2Service} from "./login-2.service";
import {PromiseResponse} from "../../../../Model/PromiseResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginModel} from "../../../../Model/LoginModel";
import {PristineNavigationService} from "../../../../../@pristinebase/components/navigation/navigation.service";
import {navigation, navigationProject} from 'app/navigation/navigation';
import {PristineNavigation} from "../../../../../@pristinebase/types";

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {PristineConfigService} _PristineConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _PristineConfigService: PristineConfigService,
        private _formBuilder: FormBuilder,
        private _webapiHttp: WebApiHttp,
        private _encriptDecript: EncriptDecript,
        private _router: Router,
        private _login2Service: Login2Service,
        private _snackBar: MatSnackBar,
        private _pristineNavigationService: PristineNavigationService,
    ) {
        // Configure the layout
        this._PristineConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        //TODO go to login page when use is unauthorized..
        try {
            let userEmail = new EncriptDecript().decrypt(localStorage.getItem('Belle_SSID').toString());
            if (userEmail != null && userEmail != '' && userEmail != undefined && userEmail != '  ')
                this._router.navigateByUrl('/dashboard/UserDashboard');
        } catch (e) {
                this._router.navigateByUrl('/pages/auth/login-2');
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });

    }

    loading: boolean = false;

    loginUser(formdata: { email: string, password: string }): void {
        // let temp: PristineNavigation[] = navigation;
        // temp = navigationProject;
        // this._pristineNavigationService.register('main', temp);
        // this._pristineNavigationService.setCurrentNavigation('main');
        //this._router.navigateByUrl('/apps/dashboards/analytics');

        this.loading = true;
        var json = {email_id: formdata.email, password: formdata.password,flag:'Login'}
        this._login2Service.getLoginAccess(json).then((result: LoginModel) => {
            console.log(result)
            if (result.condition.toLowerCase() == 'true') {
                let temp: PristineNavigation[] = navigation;
                temp[0].children = result.menu;
                //temp = navigationProject;

                localStorage.setItem('Belle_Name', this._encriptDecript.encrypt(result.name));
                localStorage.setItem('Belle_SSID', this._encriptDecript.encrypt(formdata.email));
                sessionStorage.setItem('Belle_SSID', this._encriptDecript.encrypt(formdata.email))
                localStorage.setItem('Belle_UserID', this._encriptDecript.encrypt(result.user_id));
                localStorage.setItem('Belle_UserType', this._encriptDecript.encrypt(result.user_type));
                localStorage.setItem('Belle_menu', this._encriptDecript.encrypt(JSON.stringify(temp)));
                this._pristineNavigationService.register('main', temp);
                this._pristineNavigationService.setCurrentNavigation('main');
                this._router.navigateByUrl('/dashboard/UserDashboard');
            } else {
                this.openSnackBar(result.message);
                this.loading = false;
            }
        }).catch(err => {
            this.loading = false;
        });
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, 'Clear', {
            duration: 5000,
        });
    }
}
