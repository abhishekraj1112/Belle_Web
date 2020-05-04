import {NgModule} from '@angular/core';

import {PristineIfOnDomDirective} from '@pristinebase/directives/pristine-if-on-dom/pristine-if-on-dom.directive';
import {PristineInnerScrollDirective} from '@pristinebase/directives/pristine-inner-scroll/pristine-inner-scroll.directive';
import {PristinePerfectScrollbarDirective} from '@pristinebase/directives/pristine-perfect-scrollbar/pristine-perfect-scrollbar.directive';
import {
    PristineMatSidenavHelperDirective,
    PristineMatSidenavTogglerDirective
} from '@pristinebase/directives/pristine-mat-sidenav/pristine-mat-sidenav.directive';

@NgModule({
    declarations: [
        PristineIfOnDomDirective,
        PristineInnerScrollDirective,
        PristineMatSidenavHelperDirective,
        PristineMatSidenavTogglerDirective,
        PristinePerfectScrollbarDirective
    ],
    imports: [],
    exports: [
        PristineIfOnDomDirective,
        PristineInnerScrollDirective,
        PristineMatSidenavHelperDirective,
        PristineMatSidenavTogglerDirective,
        PristinePerfectScrollbarDirective
    ]
})
export class PristineDirectivesModule {
}
