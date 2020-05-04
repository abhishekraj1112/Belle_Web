import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PristineSearchBarModule, PristineShortcutsModule } from '@pristinebase/components';
import { PristineSharedModule } from '@pristinebase/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        PristineSharedModule,
        PristineSearchBarModule,
        PristineShortcutsModule
    ],
    exports     : [
        ToolbarComponent
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ToolbarModule
{
}
