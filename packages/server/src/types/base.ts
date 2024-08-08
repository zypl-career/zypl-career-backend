export interface IMessage {
  message: string;
  payload?: any;
}

export interface IError {
  error: string;
}

export interface IValidation {
  validation: string | object;
}

export interface IConflict {
  conflict: string;
}
