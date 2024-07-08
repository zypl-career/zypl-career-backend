import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import * as controllers from '../controller/_index.js';
import { AuthMiddleware } from '../middleware/_index.js';
import * as providers from '../service/_index.js';

@Module({
  imports: [],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class ModuleApp implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/12345');
  }
}
