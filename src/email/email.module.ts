import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailVerifyEntity } from './_db/entity/index.js';
import { EmailVerifyRepository } from './_db/repository/index.js';
import { EmailService } from './email.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerifyEntity])],
  providers: [EmailVerifyRepository, EmailService],
  exports: [EmailVerifyRepository, EmailService],
})
export class EmailModule {}
