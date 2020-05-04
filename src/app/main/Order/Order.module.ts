import { NgModule} from '@angular/core';
import {ShowOrderModule} from "./show-order/show-order.module";
import {AddOrderModule} from "./show-order/Add-order/Add-order.module";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";

@NgModule({
    imports: [
        ShowOrderModule,AddOrderModule
    ],
    providers:[{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },]

})
export class OrderModule {
}
