import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDispatchOrderComponent } from './create-dispatch-order/create-dispatch-order.component';
import {CreateDispatchOrderModule} from "./create-dispatch-order/create-dispatch-order.module";
import {ScanOrderModule} from "./scan-order/scan-order.module";
import {AppRejDispatchOrderModule} from "./app-rej-dispatch-order/app-rej-dispatch-order.module";


@NgModule({
  //declarations: [CreateDispatchOrderComponent],
  imports: [
    CommonModule,CreateDispatchOrderModule,ScanOrderModule,AppRejDispatchOrderModule
  ],
  declarations: [],

})
export class DispatchOrderModule { }
