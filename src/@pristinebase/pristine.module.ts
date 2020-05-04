import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { Pristine_CONFIG } from '@pristinebase/services/config.service';
import {PristineToaster} from "./Process/ToasterService/PristineToaster";
import {EncriptDecript} from "./Process/EncriptDecript";
import {GlobalPostingHeader} from "./Process/GlobalPostingHeader";
import {WebApiHttp} from "./Process/WebApiHttp.service";
import {LocationInfoService} from "./services/location-info.service";
import {AuthGuard} from "./Process/AuthGuard/AuthGuard";

@NgModule()
export class PristineModule
{
    constructor(@Optional() @SkipSelf() parentModule: PristineModule)
    {
        if ( parentModule )
        {
            throw new Error('PristineModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders<PristineModule>
    {
        return {
            ngModule : PristineModule,
            providers: [
                PristineToaster,EncriptDecript,GlobalPostingHeader,WebApiHttp,LocationInfoService,
                {
                    provide : Pristine_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
