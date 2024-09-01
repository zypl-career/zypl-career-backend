import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/module.app.js';
import { AppDataSource } from './app/globals.app.js';
import { Config } from './app/config.app.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });

  await AppDataSource.initialize();
  const config = new DocumentBuilder()
    .setTitle('Career API')
    .setDescription('The Career API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(Config.port || 8000);
}

bootstrap().then(() => console.log('Server started on http://localhost:8000'));
