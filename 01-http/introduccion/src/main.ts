import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser'); //import en JS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
//inicio configuracion


  app.use(cookieParser('Me gustan las polipapas'));
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore(),
      }),
  )

//final configuracion
  await app.listen(3001);
}
bootstrap();
