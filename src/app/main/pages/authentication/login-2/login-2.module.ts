import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { PristineSharedModule } from '@pristinebase/shared.module';

import { Login2Component } from 'app/main/pages/authentication/login-2/login-2.component';
import {Login2Service} from "./login-2.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes = [
    {
        path     : 'auth/login-2',
        component: Login2Component,
        resolve: {
            login: Login2Service
        }
    }
];

@NgModule({
    declarations: [
        Login2Component
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        PristineSharedModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    providers:[
        Login2Service
    ]
})
export class Login2Module
{
}
