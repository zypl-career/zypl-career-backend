import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [UserModule, DatabaseModule],
})
export class AppModule {}
