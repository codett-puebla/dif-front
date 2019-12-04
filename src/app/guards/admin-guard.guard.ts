import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import PermissionUtil from '../util/permission.util';

@Injectable({
    providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
    canActivate() {
        return PermissionUtil.getPermission();
    }
}
