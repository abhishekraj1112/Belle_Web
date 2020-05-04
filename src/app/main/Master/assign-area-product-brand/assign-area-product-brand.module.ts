import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AssignAreaProductBrandComponent} from "./assign-area-product-brand.component";
import {RouterModule, Routes} from "@angular/router";
import {AssignAreaProductBrandService} from "./assign-area-product-brand.service";
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
import {AuthGuard} from "../../../../@pristinebase/Process/AuthGuard/AuthGuard";
import {PristineSharedModule} from "../../../../@pristinebase/shared.module";

const routes:Routes=[
    {
        path:'assign-area-brand',
        component:AssignAreaProductBrandComponent,
        resolve:{assignbrand:AssignAreaProductBrandService},
    }
]
@NgModule({
    declarations:[
        AssignAreaProductBrandComponent
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
        PristineSharedModule

    ],
    providers:[AssignAreaProductBrandService]

})
export class AssignAreaProductBrandModule
{
}
