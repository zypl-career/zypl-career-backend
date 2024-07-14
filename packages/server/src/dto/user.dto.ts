import {
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsIn,
  IsEmail,
  Length,
  IsUUID,
} from 'class-validator';
import {
  IUserCreateDataDTO,
  IUserLoginDataDTO,
  IUserUpdateDataDTO,
} from '../types/user.js';

//----------------------------------------------------------------
// DTO USER CREATE
//----------------------------------------------------------------
export class CreateUserDto implements IUserCreateDataDTO {
  @IsString({ message: 'surname must be a string' })
  surname: string;

  @IsString({ message: 'patronymic must be a string' })
  @IsOptional()
  patronymic?: string;

  @IsIn(['male', 'female'], { message: 'gender must be either male or female' })
  gender: 'male' | 'female';

  @IsInt({ message: 'age must be an integer' })
  @Min(1, { message: 'age must be at least 1' })
  @Max(120, { message: 'age must be at most 120' })
  @IsOptional()
  age?: number;

  @IsString({ message: 'district must be a string' })
  @IsOptional()
  district?: string;

  @IsIn(['student', 'teacher', 'parents'], {
    message: 'role must be either student, teacher, or parents',
  })
  role: 'student' | 'teacher' | 'parents';

  @IsString({ message: 'school must be a string' })
  @IsOptional()
  school?: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsString({ message: 'Login must be a string' })
  login: string;

  @IsString({ message: 'password must be a string' })
  @Length(8, 20, { message: 'password must be between 8 and 20 characters' })
  password: string;

  @IsString({ message: 'name must be a string' })
  name: string;
}

//----------------------------------------------------------------
//DTO USER UPDATE
//----------------------------------------------------------------

export class UpdateUserDto implements IUserUpdateDataDTO {
  @IsString({ message: 'surname must be a string' })
  @IsOptional()
  surname?: string;

  @IsString({ message: 'patronymic must be a string' })
  @IsOptional()
  patronymic?: string;

  @IsIn(['male', 'female'], { message: 'gender must be either male or female' })
  @IsOptional()
  gender?: 'male' | 'female';

  @IsInt({ message: 'age must be an integer' })
  @Min(1, { message: 'age must be at least 1' })
  @Max(120, { message: 'age must be at most 120' })
  @IsOptional()
  age?: number;

  @IsString({ message: 'district must be a string' })
  @IsOptional()
  district?: string;

  @IsIn(['student', 'teacher', 'parents'], {
    message: 'role must be either student, teacher, or parents',
  })
  @IsOptional()
  role?: 'student' | 'teacher' | 'parents';

  @IsString({ message: 'school must be a string' })
  @IsOptional()
  school?: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'password must be a string' })
  @Length(8, 20, { message: 'password must be between 8 and 20 characters' })
  @IsOptional()
  password?: string;

  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;
}

//----------------------------------------------------------------
//DTO USER LOGIN
//----------------------------------------------------------------
export class LoginUserDto implements IUserLoginDataDTO {
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsString({ message: 'password must be a string' })
  password: string;
}
