import {HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class GlobalPostingHeader {
    get getHTTPHeader(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    getHTTPHeaderAuth(token: string): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
    }
}
