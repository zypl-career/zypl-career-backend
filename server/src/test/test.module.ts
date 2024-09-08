import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module.js';

import { TestEntity } from './_db/entity/index.js';
import { TestRepository } from './_db/repository/index.js';
import { TestController } from './test.controller.js';
import { TestService } from './test.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity]), UserModule],
  controllers: [TestController],
  providers: [TestService, TestRepository],
})
export class TestModule {}