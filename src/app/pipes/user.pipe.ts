import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'userType'
})
export class UserPipe implements PipeTransform {

    transform(value: number): string {
        let userType = 'Administrador';

        if (value > 1) {
            userType = 'Usuario';
        }

        return userType;
    }

}
