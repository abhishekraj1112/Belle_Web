import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";


@Injectable()
export class Login2Service implements Resolve<any> {
    constructor(
        private WebApiHttp: WebApiHttp
    ) {
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    }

    getLoginAccess(postedjson: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.UserLoginAccess, postedjson).then(result => resolve(result), reject)
                .catch(error => reject(error));
        });
    }
}
