export interface IUserRegisterData {
  name: string;
  login: string;
  password: string;
}

export interface IUserLoginData {
  login: string;
  password: string;
}

export interface IUserLoginResult {
  access: string;
  refresh: string;
}

export interface IMessage {
  message: string;
}

export interface IError {
  error: string;
}

export interface IValidation {
  validation: string;
}
