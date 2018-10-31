import { User } from "../../models/user";
import { DataContext } from "../datacontext.service";


export class DC_User extends User {
    static keys: string[] = [];
    super(
        dataContext: DataContext,
        mapper: any,
        getById: any = null,
        keys: string[] = null
    ) {

    }

    public static getById(dto: any): string {
        return dto.id;
    }



    public static Mapper(dto: any, entity: User, dataContext: DataContext): User {
        if (!entity) {
            entity = new User();
        }
        Object.assign(entity,dto);
        return entity;
    }
}