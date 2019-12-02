import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  route: string;
  constructor(
      private router: Router
  ) {
    this.route = this.router.url;
  }

  ngOnInit() {
  }

}
