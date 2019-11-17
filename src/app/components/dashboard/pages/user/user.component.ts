import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserRegisterModel} from '../../../../models/user.model';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: UserRegisterModel;
  panelOpenState = false;
  typeUser: any[] = [
    {value: '1', viewValue: 'Usuario'},
    {value: '2', viewValue: 'Administrador'},
  ];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() {
    this.user = new UserRegisterModel();
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    console.log('NEW ITEM ---> ', form);
  }

}
