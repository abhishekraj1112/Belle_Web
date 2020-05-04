import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PristineSharedModule } from '@pristinebase/shared.module';
import { PristineWidgetModule } from '@pristinebase/components/widget/widget.module';
import {userdashboardComponent} from "./userdashboard.component";
import {UserdashboardService} from "./userdashboard.service";

const routes: Routes = [
    {
        path     : 'UserDashboard',
        component: userdashboardComponent,
    }
];

@NgModule({
    declarations: [
        userdashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        ChartsModule,
        NgxChartsModule,
        PristineSharedModule,
        PristineWidgetModule
    ],
    providers   : [
        UserdashboardService
    ]
})
export class UserdashboardModule
{
}

