import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser'); //import en JS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
//inicio configuracion


  app.use(cookieParser('Me gustan las polipapas'));
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));

//final configuracion
  await app.listen(3001);
}
bootstrap();
