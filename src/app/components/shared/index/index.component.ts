import { Component, OnInit } from '@angular/core';
import {MODULES} from '../../../util/const.util';

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

}
