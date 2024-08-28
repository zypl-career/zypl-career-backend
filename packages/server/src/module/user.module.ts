import { Module } from '@nestjs/common';
import { UsersController } from '../controller/_index.js';
import { UserService } from '../service/_index.js';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
