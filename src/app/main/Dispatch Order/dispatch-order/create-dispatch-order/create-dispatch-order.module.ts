import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateDispatchOrderComponent} from "./create-dispatch-order.component";
import {FlexModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PristinePipesModule} from "../../../../../@pristinebase/pipes/pipes.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CreateDispatchOrderService} from "./create-dispatch-order.service";
import {addExistingOrderDialogComponent} from "./add-existing-order-dialog/add-existing-order-dialog.component";
import {show_dispatch_orderLineComponent} from "./show_dispatch_orderLine/show_dispatch_orderLine.component";
import {show_sales_orderLineComponent} from "./show_sales_orderLine/show_sales_orderLine.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

const routes:Routes=[
  {
    path:'create_dispatch_order',
    component:CreateDispatchOrderComponent,
    resolve:{createDispatchOrder:CreateDispatchOrderService},

  },
    {
        path:'add-existing-order',
        component:addExistingOrderDialogComponent
    }

]
@NgModule({
  declarations: [CreateDispatchOrderComponent,addExistingOrderDialogComponent,show_dispatch_orderLineComponent,show_sales_orderLineComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FlexModule,
        MatDividerModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        CommonModule,
        MatPaginatorModule,
        PristinePipesModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatTooltipModule,
        Ng2SmartTableModule,
        MatCheckboxModule
    ],
    entryComponents:[addExistingOrderDialogComponent,show_dispatch_orderLineComponent,show_sales_orderLineComponent],
    providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
    ]
})
export class CreateDispatchOrderModule {

}
