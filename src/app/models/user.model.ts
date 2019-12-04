export class UserModel {
  username = '';
  password = '';
}

export class UserRegisterModel {
  username = 'alex@gmail.com';
  password = 'secret';
  confirmPassword = '';

}

export interface UserInterfaceModel {
  id?: number;
  username: string;
  password: string;
  status: number;
  create_at: string;
}


