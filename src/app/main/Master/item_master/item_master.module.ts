import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {Item_masterComponent} from "./item_master.component";
import {RouterModule, Routes} from "@angular/router";
import {Item_masterService} from "./item_master.service";
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
import {PriviewFileComponent} from "./priviewFile/priviewFile.component";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes:Routes=[
    {
        path:'item_master',
        component:Item_masterComponent,
        resolve:{viewDistribution:Item_masterService}
    }
]
@NgModule({
    declarations:[
        Item_masterComponent,
        PriviewFileComponent
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
        MatTooltipModule

    ],
    entryComponents: [PriviewFileComponent],
    providers:[Item_masterService]

})
export class Item_masterModule
{
}
