import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '../email/email.module.js';

import { UserEntity } from './_db/entity/index.js';
import { UserRepository } from './_db/repository/index.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
