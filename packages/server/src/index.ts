import { NestFactory } from '@nestjs/core/index.js';

import { AppDataSource } from './app/globals.app.js';
import { ModuleApp } from './app/module.app.js';

async function bootstrap() {
  const app = await NestFactory.create(ModuleApp, { cors: true });
  await app.listen(8000);
  await AppDataSource.initialize();
}
bootstrap().then(() => console.log('Server started on http://localhost:8000/'));
