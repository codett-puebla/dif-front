import { Component, OnInit } from '@angular/core';
import {MODULES} from '../../../util/const.util';
import PermissionUtil from '../../../util/permission.util';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  modulos = MODULES;
  title = 'Inicio';
  icon = 'fa-bars';
  constructor() { }

  ngOnInit() {
  }
  getPermission(permission: number): boolean {
    return PermissionUtil.getPermission(permission);
  }
}
