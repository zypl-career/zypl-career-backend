export type SignUpDataType = {
  id?: string;
  name: string;
  email: string;
  dateOfBirth: string;
  city: string;
  gender: string;
  password: string;
  code: string;
};

export type SignInDataType = {
  email: string;
  password: string;
};
