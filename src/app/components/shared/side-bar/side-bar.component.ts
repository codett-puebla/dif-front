import {Component, OnInit, Input} from '@angular/core';
import {MODULES} from '../../../util/const.util';
import PermissionUtil from '../../../util/permission.util';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    @Input() toggle;
    modulos = MODULES;

    constructor() {
    }

    ngOnInit() {
    }

    getPermission(permission: number): boolean {
        return PermissionUtil.getPermission(permission);
    }
}
