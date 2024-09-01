import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../middleware/_index.js';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import {
  ArticlesModule,
  CoursesModule,
  EducationalCentersModule,
  LessonsModule,
  SpecialtyModule,
  TestModule,
  UniversityModule,
  UserModule,
  VideoModule,
  PartnerModule,
  PdfStorageModule,
  ImageStorageModule,
} from '../module/_index.js';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ArticlesModule,
    CoursesModule,
    EducationalCentersModule,
    LessonsModule,
    SpecialtyModule,
    TestModule,
    UniversityModule,
    UserModule,
    VideoModule,
    PartnerModule,
    PdfStorageModule,
    ImageStorageModule,
  ],
})

// export class ModuleApp implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(
//       // '/article/create',
//       // '/article/update',
//       // '/article/delete',
//       // '/result-modal/get',
//       // '/specialty/create',
//       // '/specialty/update',
//       // '/specialty/delete',
//       // '/university/create',
//       // '/university/update',
//       // '/university/delete',
//       // '/partner/create',
//       // '/partner/update',
//       // '/partner/delete',
//       // '/lessons/',
//       // '/courses/',
//       // '/education-center/create',
//       // '/education-center/update',
//       // '/education-center/delete',
//       // '/user/get',
//       // '/user/update',
//       // '/user/delete',
//       '2212121/',
//     );
//   }
// }
export class AppModule {}
