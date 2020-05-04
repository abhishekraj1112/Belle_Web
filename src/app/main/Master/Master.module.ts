import { NgModule} from '@angular/core';
import {AddLocationModule} from "./add-location/add-location.module";
import {AddRsmSalespersonmodule} from "./add-rsm-salesperson/add-rsm-salespersonmodule";
import {AddRetailerModule} from "./add-retailer/add-retailer.module";
import {ViewDistributorsModule} from "./view-distributors/view-distributors.module";
import {AssignAreaProductBrandModule} from "./assign-area-product-brand/assign-area-product-brand.module";
import {Assign_daywisearea_to_salesmanModule} from "./assign_daywisearea_to_salesman/assign_daywisearea_to_salesman.module";
import {Item_masterModule} from "./item_master/item_master.module";

@NgModule({
    imports: [
        AddLocationModule,
        AddRsmSalespersonmodule,
        AddRetailerModule,
        ViewDistributorsModule,
        AssignAreaProductBrandModule,
        Assign_daywisearea_to_salesmanModule,
        Item_masterModule
    ],

})
export class MasterModule {
}
