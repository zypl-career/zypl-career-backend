import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EmailVerifyEntity } from '../entity/index.js';

@Injectable()
export class EmailVerifyRepository extends Repository<EmailVerifyEntity> {
  constructor(private dataSource: DataSource) {
    super(EmailVerifyEntity, dataSource.createEntityManager());
  }
}
