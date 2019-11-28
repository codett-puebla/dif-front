export class UserModel {
  username = 'alex@gmail.com';
  password = 'secret';
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


