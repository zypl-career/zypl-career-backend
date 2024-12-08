import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '../email/email.module.js';

import { UserFastEntity } from './_db/entity/index.js';
import { UserFastRepository } from './_db/repository/index.js';
import { UserController } from './user.controller.js';
import { UserFastService } from './user.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserFastEntity]), EmailModule],
  controllers: [UserController],
  exports: [UserFastRepository],
  providers: [UserFastService, UserFastRepository],
})
export class UserFastModule {}
