import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRejDispatchOrderComponent} from "./app-rej-dispatch-order.component";
import {RouterModule, Routes} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PristinePipesModule} from "../../../../../@pristinebase/pipes/pipes.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PristineSharedModule} from "../../../../../@pristinebase/shared.module";
import {AppRejDispatchOrderService} from "./app-rej-dispatch-order.service";
import {ShowOrderLineComponent} from "./show-order-line/show-order-line.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRippleModule} from "@angular/material/core";

const routes:Routes=[{
    path:'approverejectdispatchorder',
    component:AppRejDispatchOrderComponent,
     resolve:{dispatchorderheader:AppRejDispatchOrderService}
    },{
      path:'showorderline',
      component:ShowOrderLineComponent,
    }
    ]

@NgModule({
  declarations: [AppRejDispatchOrderComponent,ShowOrderLineComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        PristinePipesModule,
        FlexLayoutModule,
        PristineSharedModule,
        MatDividerModule,
        MatTooltipModule,
        MatRippleModule,
    ]
})
export class AppRejDispatchOrderModule { }
