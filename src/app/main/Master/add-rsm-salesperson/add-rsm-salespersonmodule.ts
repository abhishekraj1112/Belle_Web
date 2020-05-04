import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
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
import {AddRsmSalespersonComponent} from "./add-rsm-salesperson.component";
import {AddRsmSalespersonService} from "./add-rsm-salesperson.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {editSalespersonDailogComponent} from "./EditSalespersonDailog/EditSalespersonDailog.component";
import{MatDialogModule} from "@angular/material/dialog";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes:Routes=[
    {
        path:'add-salesperson',
        component:AddRsmSalespersonComponent,
        resolve:{addSp:AddRsmSalespersonService}
    },{
        path:'edit-salesperson',
        component:editSalespersonDailogComponent
    }
]
@NgModule({
    declarations:[
        AddRsmSalespersonComponent,editSalespersonDailogComponent

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
        MatExpansionModule,
        MatDialogModule,
        MatRippleModule,
        MatTooltipModule


    ],
    //providers:[AddRsmSalespersonService]

})
export class AddRsmSalespersonmodule
{
}
