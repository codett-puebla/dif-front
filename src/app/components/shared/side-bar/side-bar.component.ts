import { Component, OnInit, Input } from '@angular/core';
import {MODULES} from '../../../util/const.util';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() toggle;
  modulos = MODULES;

  constructor() { }

  ngOnInit() {
  }
}
