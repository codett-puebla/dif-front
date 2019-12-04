import {ADMIN, USER} from './const.util';

export default class PermissionUtil {

    static getPermission(permission = USER): boolean {
        const typeUser = +localStorage.getItem('typeUser');

        if (typeUser === ADMIN || permission <=  typeUser)  {
            return true;
        }
        return false;
    }
}
