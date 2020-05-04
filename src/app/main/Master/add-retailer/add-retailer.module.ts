import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AddRetailerComponent} from "./add-retailer.component";
import {RouterModule, Routes} from "@angular/router";
import {AddRetailerService} from "./add-retailer.service";
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
import {identifierModuleUrl} from "@angular/compiler";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {add_retailer_by_excelComponent} from "./add_retailer_by_excel/add_retailer_by_excel.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ShowRetailerModule} from "./show-retailer/show-retailer.module";

const routes:Routes=[
    {
        path:'addretailer',
        component:AddRetailerComponent,
        resolve:{addretailer:AddRetailerService},

    }
]
@NgModule({
    declarations:[
        AddRetailerComponent,add_retailer_by_excelComponent
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
        ShowRetailerModule

    ],
    providers:[AddRetailerService]

})
export class AddRetailerModule
{
}
