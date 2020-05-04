import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {Assign_daywisearea_to_salesmanService} from "./assign_daywisearea_to_salesman.service";
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
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PristinePipesModule} from "../../../../@pristinebase/pipes/pipes.module";
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {Assign_daywisearea_to_salesmanComponent} from "./assign_daywisearea_to_salesman.component";
import {MatExpansionModule} from "@angular/material/expansion";

const routes:Routes=[
    {
        path:'assign_daywise_area',
        component:Assign_daywisearea_to_salesmanComponent,
        resolve:{assignDayWiseArea:Assign_daywisearea_to_salesmanService}
    }
]
@NgModule({
    declarations:[
        Assign_daywisearea_to_salesmanComponent
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
        MatExpansionModule

    ],
    providers:[Assign_daywisearea_to_salesmanService]

})
export class Assign_daywisearea_to_salesmanModule
{
}
