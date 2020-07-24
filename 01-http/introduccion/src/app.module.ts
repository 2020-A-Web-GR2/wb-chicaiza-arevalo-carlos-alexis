import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      //aqui otro modulos
        HttpJuegoModule,
        UsuarioModule,
        TypeOrmModule
            .forRoot({
                name: 'default', //nombre conexion
                type: 'mysql', //mysqlpostgres
                host: 'localhost', //ip
                port : 3306,    //puerto
                username: 'root',   //usuario
                password: 'root',   //password
                databse: 'test',    //Base de datos
                entities:[  //todas las entidades

                ],
                syncronize: true,   //Actualiza el esquema de la base de datos
                dropSchema: false,  //eliminar datos y el esquema de base de datos
            }),
  ],
  controllers: [
      // Controladores app module
      AppController],
  providers: [
      // Servicios app module
      AppService],
})
export class AppModule {}
