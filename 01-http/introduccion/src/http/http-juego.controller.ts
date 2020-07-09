import {BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from "@nestjs/common";
import {query} from "express";

// /juegos-http
@Controller('juegos-http')

export class HttpJuegoController{

    @Get('hola')
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException('no envia nada')


        return 'Hola Mundo :v get'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Hola Mundo :v post'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando')
    holaDelete(){
        return 'Hola Mundo :v delete'
    }

    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplos(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);

        //Validar que es un numero
        if(!(isNaN(parametrosRuta.edad)) && !(isNaN(parametrosRuta.altura))){
            const edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura);
            return edad+altura;
        }else{
            throw new BadRequestException('no son numeros')
        }
    }
    @Get('parametros-consulta')

    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        console.log('parametrosDeConsulta', parametrosDeConsulta);

        if(parametrosDeConsulta.nombre &&
            parametrosDeConsulta.apellido){
            const nombre = parametrosDeConsulta.nombre;
            const apellido = parametrosDeConsulta.apellido;
            return (nombre.concat("\t"+apellido));
        }else{
            return '=)';
        }
    }

    @Post('parametros-cuerpo')
    parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        console.log('Parametros de cuerpo', parametrosDeCuerpo);

        return 'Registro Creado';
    }

}
