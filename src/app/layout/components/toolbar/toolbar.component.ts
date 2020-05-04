import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { PristineConfigService } from '@pristinebase/services/config.service';
import { PristineSidebarService } from '@pristinebase/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import {Router} from "@angular/router";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";

@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    UserName:string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {PristineConfigService} _PristineConfigService
     * @param {PristineSidebarService} _PristineSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _PristineConfigService: PristineConfigService,
        private _PristineSidebarService: PristineSidebarService,
        private _translateService: TranslateService,
        private _router:Router,
        private _WebApiHttp:WebApiHttp,
        private  _encriptdecript:EncriptDecript
    )
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon : 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon : 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon : 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'tr',
                title: 'Turkish',
                flag : 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.UserName=this._encriptdecript.decrypt(localStorage.getItem('Belle_Name'))
        // Subscribe to the config changes
        this._PristineConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._PristineSidebarService.getSidebar(key).toggleOpen();
    }
    LogoutFrom_Server(){
        var json={flag:"Logout",email_id:this._encriptdecript.decrypt(localStorage.getItem('Belle_SSID')),password:''}
        try{
            this._WebApiHttp.PostDataToServer(this._WebApiHttp.ApiUrlArray.UserLoginAccess,json)
                .then(result=>{
                    console.log(result);
                    // let response:Array<{condition:string,message:string}>=result
                    if(result.condition.toLowerCase()=='true'){
                        localStorage.clear();
                        window.location.reload();
                    }
                })
        }catch (e) {

        }

    }
    AddNewUser(){
        this._router.navigateByUrl('/pages/auth/register-2');
    }
    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }
}
