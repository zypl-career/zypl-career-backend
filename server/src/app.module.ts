import { Module } from '@nestjs/common';

import { ArticleModule } from './article/article.module.js';
import { CourseModule } from './course/course.module.js';
import { DatabaseModule } from './database/database.module.js';
import { EducationalCentersModule } from './educational-center/educational-center.module.js';
import { LessonModule } from './lesson/lesson.module.js';
import { PartnerModule } from './partner/partner.module.js';
import { PdfModule } from './pdf/pdf.module.js';
import { SpecialtyModule } from './specialty/specialty.module.js';
import { StatisticsModule } from './statistics/statistics.module.js';
import { TestModule } from './test/test.module.js';
import { UniversityModule } from './university/university.module.js';
import { UserModule } from './user/user.module.js';
import { TxtModule } from './txt/txt.module.js';
import { UserFastModule } from './user-fast/user.module.js';

@Module({
  imports: [
    UserModule,
    UserFastModule,
    DatabaseModule,
    ArticleModule,
    CourseModule,
    EducationalCentersModule,
    LessonModule,
    PdfModule,
    TxtModule,
    PartnerModule,
    SpecialtyModule,
    TestModule,
    UniversityModule,
    StatisticsModule,
  ],
})
export class AppModule {}
