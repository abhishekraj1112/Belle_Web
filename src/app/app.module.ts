import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {TranslateModule} from '@ngx-translate/core';
import {PristineModule} from '@pristinebase/pristine.module';
import {PristineSharedModule} from '@pristinebase/shared.module';
import {PristineProgressBarModule, PristineSidebarModule, PristineThemeOptionsModule} from '@pristinebase/components';
import {pristineConfig} from 'app/pristine-config';
import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {WebApiHttp} from "../@pristinebase/Process/WebApiHttp.service";
import {EncriptDecript} from "../@pristinebase/Process/EncriptDecript";
import {GlobalPostingHeader} from "../@pristinebase/Process/GlobalPostingHeader";
import {NgxLoadingModule} from "ngx-loading";
import {NgxSpinnerModule} from "ngx-spinner";
const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'master',
        loadChildren: () => import('./main/master/Master.module').then(m => m.MasterModule)
    },
    {
        path: 'order',
        loadChildren: () => import('./main/order/Order.module').then(m => m.OrderModule)
    },
    {
        path: 'dispatch_order',
        loadChildren: () => import('./main/Dispatch Order/dispatch-order/dispatch-order.module').then(m => m.DispatchOrderModule)
    },
    {
        path: 'setup',
        loadChildren: () => import('./main/Setup/Setup.module').then(m => m.SetupModule)
    },
    {
        path: '**',
        redirectTo: '/dashboard/UserDashboard'
    }
];
const providerservices:Provider=[
    GlobalPostingHeader,EncriptDecript,WebApiHttp
];
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),
        TranslateModule.forRoot(),
        //slider
        NgxLoadingModule.forRoot({}),
        NgxSpinnerModule,
        // Material moment date module
        MatMomentDateModule,
        // Material
        MatButtonModule,
        MatIconModule,
        // Pristine modules
        PristineModule.forRoot(pristineConfig),
        PristineProgressBarModule,
        PristineSharedModule,
        PristineSidebarModule,
        PristineThemeOptionsModule,
        // App modules
        LayoutModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    bootstrap: [
        AppComponent
    ],
    providers:[...providerservices]
})
export class AppModule {
}
