import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ShowRetailerComponent} from "./show-retailer.component";
import {RouterModule, Routes} from "@angular/router";
import {ShowRetailerService} from "./show-retailer.service";
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
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {identifierModuleUrl} from "@angular/compiler";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {PristinePipesModule} from "../../../../../@pristinebase/pipes/pipes.module";
import {MatRippleModule} from "@angular/material/core";

const routes:Routes=[

    {
        path:'show-retailer',
        component:ShowRetailerComponent,
        //resolve:{addretailer:ShowRetailerService},
    }
]
@NgModule({
    declarations:[
        ShowRetailerComponent
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
        MatStepperModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatExpansionModule,
        Ng2SmartTableModule,
        MatRippleModule

    ],
    providers:[ShowRetailerService]

})
export class ShowRetailerModule
{
}
