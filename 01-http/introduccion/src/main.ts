import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser'); //import en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//inicio configuracion




  app.use(cookieParser());
//final configuracion
  await app.listen(3001);
}
bootstrap();
