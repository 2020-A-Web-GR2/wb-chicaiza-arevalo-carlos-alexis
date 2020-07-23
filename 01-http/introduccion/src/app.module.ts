import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      //aqui otro modulos
        HttpJuegoModule,
        UsuarioModule
  ],
  controllers: [
      // Controladores app module
      AppController],
  providers: [
      // Servicios app module
      AppService],
})
export class AppModule {}
