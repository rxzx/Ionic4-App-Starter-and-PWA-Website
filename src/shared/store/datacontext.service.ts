import { Injectable } from "@angular/core";
import { DC_User } from "./models/dc_user";
import { Store } from "./store";

@Injectable()
export class DataContext {    
    dc_user: Store<DC_User>;
    constructor() {
        this.dc_user = new Store<DC_User>(this, DC_User.Mapper, DC_User.getById, DC_User.keys);
    }

}