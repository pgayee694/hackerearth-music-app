import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: path.join(__dirname, './../../.env'),
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3001;

  app.enableCors();
  await app.listen(port, () => console.log(`Started on port ${port}`));
}

bootstrap();
