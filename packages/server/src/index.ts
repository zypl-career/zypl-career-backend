import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ModuleApp } from './app/module.app.js';
import { AppDataSource } from './app/globals.app.js';

async function bootstrap() {
  const app = await NestFactory.create(ModuleApp, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Career API')
    .setDescription('The Career API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8000);
  await AppDataSource.initialize();
}
bootstrap().then(() => console.log('Server started on http://localhost:8000/'));
