import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ShowOrderComponent} from "./show-order.component";
import {RouterModule, Routes} from "@angular/router";
import {ShowOrderService} from "./show-order.service";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PristinePipesModule} from "../../../../@pristinebase/pipes/pipes.module";
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {show_orderLineComponent} from "./show_orderLine/show_orderLine.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {FlexModule} from "@angular/flex-layout";
import {ShowOrderDetailComponent} from "./show-order-detail/show-order-detail.component";
import {PristineSharedModule} from "../../../../@pristinebase/shared.module";

const routes:Routes=[
    {
        path:'show-order',
        component:ShowOrderComponent,
        resolve:{showOrder:ShowOrderService},

    },{
        path:'show-orderLine',
        component:show_orderLineComponent,
    },
    {
        path:'show-order-detail',
        component:ShowOrderDetailComponent,
    }
]
@NgModule({
    declarations:[
        ShowOrderComponent,show_orderLineComponent,ShowOrderDetailComponent
    ],
    imports: [
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
        PristineSharedModule

    ],
    providers:[ShowOrderService]

})
export class ShowOrderModule
{
}
