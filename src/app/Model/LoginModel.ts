import {PristineNavigationItem} from "../../@pristinebase/types";

export class LoginModel {
    name: string;
    email_id: string;
    role_id: string;
    user_id:string;
    user_type:string
    condition: string;
    message: string;
    menu: Array<PristineNavigationItem>;
}
