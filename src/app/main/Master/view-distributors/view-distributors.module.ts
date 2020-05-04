import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ViewDistributorsComponent} from "./view-distributors.component";
import {RouterModule, Routes} from "@angular/router";
import {ViewDistributorsService} from "./view-distributors.service";
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

const routes:Routes=[
    {
        path:'view-distributors',
        component:ViewDistributorsComponent,
        resolve:{viewDistribution:ViewDistributorsService}
    }
]
@NgModule({
    declarations:[
        ViewDistributorsComponent
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
        MatAutocompleteModule

    ],
    providers:[ViewDistributorsService]

})
export class ViewDistributorsModule
{
}
