
import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";



@Pipe({
  name: "searchItemGroup"
})
export class searchShippingOrderDataFilterPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return _.filter(items, field => field.item_group.toLowerCase().indexOf(value.toLowerCase()) > -1)
  }
}

@Pipe({
  name: "searchfirmName"
})
export class SearchPendingDocNoFilterPipe implements PipeTransform {
  transform(items: any, value: string): any {
    if (!items) {
      return items;
    }
    if (!value) {
      return items;
    }
    return _.filter(items, field => field.firm_name.toLowerCase().indexOf(value.toLowerCase()) > -1)

  }
}

@Pipe({
  name: "searchMarket"
})
export class SearchOrderDataFilterPipe implements PipeTransform {
  transform(items: any, value: string): any {
    if (!items) {
      return items;
    }
    if (!value) {
      return items;
    }

    return _.filter(items, field => field.day_market.toLowerCase().indexOf(value.toLowerCase()) > -1)
  }
}

@Pipe({
  name: "searchSalesman"
})
export class SearchSalesmanData implements PipeTransform {
  transform(items: any, value: string): any {
    if (!items) {
      return items;
    }
    if (!value) {
      return items;
    }

    return _.filter(items, field => field.rsm.toLowerCase().indexOf(value.toLowerCase())> -1)
  }
}

@Pipe({
  name: "searchState"
})
export class SearchState implements PipeTransform {
  transform(items: any, value: string): any {
    if (!items) {
      return items;
    }
    if (!value) {
      return items;
    }

    return _.filter(items, field => field.state.toLowerCase().indexOf(value.toLowerCase())> -1)
  }
}


