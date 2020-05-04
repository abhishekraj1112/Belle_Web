import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PristineDirectivesModule } from '@pristinebase/directives/directives';
import { PristinePipesModule } from '@pristinebase/pipes/pipes.module';
import {ToastrModule} from "ngx-toastr";
import {PristineConfirmDialogModule} from "./components";
import {PristineConfirmDialogInputModule} from "./components/confirm-dialog-input/confirm-dialog-input.module";

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        PristineDirectivesModule,
        PristinePipesModule,
        ToastrModule.forRoot(),
        PristineConfirmDialogModule,
        PristineConfirmDialogInputModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        PristineDirectivesModule,
        PristinePipesModule,

    ],

})
export class PristineSharedModule
{
}
