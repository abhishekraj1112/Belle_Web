import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {Assign_usernameService} from "./assign_username.service";
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
import {Assign_usernameComponent} from "./assign_username.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {changePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";

const routes:Routes=[
    {
        path:'assign-username',
        component:Assign_usernameComponent,
        resolve:{assignusername:Assign_usernameService}
    },
    {
        path:'change-password-dialog',
        component:changePasswordDialogComponent,
        //resolve:{assignusername:Assign_usernameService}
    }
]
@NgModule({
    declarations:[
        Assign_usernameComponent,changePasswordDialogComponent
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
        MatTooltipModule,
        MatDialogModule
    ],
    providers:[Assign_usernameService],


})
export class Assign_usernameModule
{
}
