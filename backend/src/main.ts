import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '../.env',
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT) || 3001);
}

bootstrap();
