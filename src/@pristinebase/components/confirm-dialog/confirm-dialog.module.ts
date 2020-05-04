import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PristineConfirmDialogComponent } from '@pristinebase/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        PristineConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        PristineConfirmDialogComponent
    ],
})
export class PristineConfirmDialogModule
{
}
