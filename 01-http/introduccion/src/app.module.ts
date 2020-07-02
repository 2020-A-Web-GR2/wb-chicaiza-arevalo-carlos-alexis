import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      //aqui otro modulos

  ],
  controllers: [
      // Controladores app module
      AppController],
  providers: [
      // Servicios app module
      AppService],
})
export class AppModule {}
