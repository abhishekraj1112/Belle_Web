import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScanOrderComponent} from "./scan-order.component";
import {RouterModule, Routes} from "@angular/router";
import {ScanOrderService} from "./scan-order.service";
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
import {show_scanned_itemComponent} from "./show_scanned_item/show_scanned_item.component";

const routes:Routes=[
  {
    path:'scan-order',
    component:ScanOrderComponent,
    //resolve:{ScanOrder:ScanOrderService},

  },
]

@NgModule({
  declarations: [ScanOrderComponent,show_scanned_itemComponent],
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
  entryComponents:[show_scanned_itemComponent]
})
export class ScanOrderModule { }
