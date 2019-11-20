import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserRegisterModel} from '../../../../models/user.model';
import {ErrorStateMatcher} from '@angular/material/core';


// export class MyErrorStateMatcher implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         const isSubmitted = form && form.submitted;
//         return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//     }
// }

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
    form: FormGroup;


    // matcher = new MyErrorStateMatcher();

    constructor() {
        this.user = new UserRegisterModel();

        this.form = new FormGroup(
            {
                email : new FormControl('', [Validators.required, Validators.maxLength(3), Validators.maxLength(30), Validators.email]),
                password : new FormControl('', [Validators.required, Validators.maxLength(3), Validators.maxLength(30)]),
                confirmPassword : new FormControl('', [Validators.required, Validators.maxLength(3), Validators.maxLength(30)]),
                typeUser : new FormControl('', [Validators.required]),
            }
        );
    }

    ngOnInit() {
    }

    submit() {
        console.log('NEW ITEM ---> ', this.form);
    }

  getAttrMessage(attr: string) {
    const abstractControl = this.form.get(attr);
    return abstractControl.hasError('required') ? '* Requerido' :
        abstractControl.hasError('minlength') ? 'Minimo de Caracteres: 3' :
            abstractControl.hasError('maxlength') ? 'Máximo de Caracteres: 30' :
            abstractControl.hasError('email') ? 'Tiene que ingresar un email valido' :
                '';
  }

}
