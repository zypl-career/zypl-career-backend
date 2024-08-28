import { Module } from '@nestjs/common';
import { ArticlesController } from '../controller/_index.js';
import { ArticlesService } from '../service/_index.js';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
