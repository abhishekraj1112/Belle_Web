import {NgModule} from '@angular/core';

import {KeysPipe} from './keys.pipe';
import {GetByIdPipe} from './getById.pipe';
import {HtmlToPlaintextPipe} from './htmlToPlaintext.pipe';
import {FilterPipe} from './filter.pipe';
import {CamelCaseToDashPipe} from './camelCaseToDash.pipe';
import {Time24to12Pipe} from "./time24to12";
import {FirstAnd_Split} from "./FirstAnd_Split";
import {
    SearchOrderDataFilterPipe,
    SearchPendingDocNoFilterPipe,
    searchShippingOrderDataFilterPipe,
    SearchSalesmanData,
    SearchState
} from "./data-filter.pipe";

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        Time24to12Pipe,
        FirstAnd_Split,
        searchShippingOrderDataFilterPipe,
        SearchPendingDocNoFilterPipe,
        SearchOrderDataFilterPipe,
        SearchSalesmanData,
        SearchState
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        Time24to12Pipe,
        FirstAnd_Split,
        searchShippingOrderDataFilterPipe,
        SearchPendingDocNoFilterPipe,
        SearchOrderDataFilterPipe,
        SearchSalesmanData,
        SearchState
    ]
})
export class PristinePipesModule
{
}
