import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as controllers from '../controller/_index.js';
import { AuthMiddleware } from '../middleware/_index.js';
import * as providers from '../service/_index.js';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import options from '../admin/options.js';
import provider from '../admin/auth-provider.js';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: options,
        auth: {
          provider,
          cookiePassword: process.env.COOKIE_SECRET!,
          cookieName: 'adminjs',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: process.env.COOKIE_SECRET!,
        },
      }),
    }),
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class ModuleApp implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/article/create',
        '/article/update',
        '/article/delete',
        '/result-modal',
        '/specialty/create',
        '/specialty/update',
        '/specialty/delete',
        '/university/create',
        '/university/update',
        '/university/delete',
        '/partner/create',
        '/partner/update',
        '/partner/delete',
        '/lessons/',
        '/courses/',
        '/education-center/create',
        '/education-center/update',
        '/education-center/delete',
      );
  }
}
