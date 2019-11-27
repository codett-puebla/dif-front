export class UserModel {
  username = 'alex@gmail.com';
  password = 'secret';
}

export class UserRegisterModel {
  username = 'alex@gmail.com';
  password = 'secret';
  confirmPassword = '';

}

export class UserModelLogged {
  id: number;
  username: string;
  name: string;
  user_type: number;
  create_time: string;
}

export interface UserInterfaceModel {
  id: number;
  username: string;
  password: string;
  status: number;
  create_at: string;
}


