import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: 1234,
    description: 'The number of the user email',
  })
  @IsInt({ message: 'code must be a number' })
  code: number;

  @ApiProperty({
    example: 'password!@#$',
    description: 'New password user',
  })
  @IsString({ message: 'new password must be string' })
  newPassword: string;
}
