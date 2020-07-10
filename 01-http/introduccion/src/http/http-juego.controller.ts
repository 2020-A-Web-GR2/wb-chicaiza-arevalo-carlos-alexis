import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res
} from "@nestjs/common";
import {query} from "express";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

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
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ) {
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casado = parametrosDeCuerpo.casado;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.castro = parametrosDeCuerpo.castro;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;

        try {
            const errores: ValidationError[] = await validate(mascotaValida)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw  new BadRequestException('Error Validando');
            } else {
                const mensajeCorrecto = {mensaje: "Se creo correctamente"};
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw  new BadRequestException('Error Validando')
        }
    }
        //1 Guardar cookie insegura
        //2 Guardar cookie segura
        //3 Mostrar cookies

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res
    ){
        res.cookie(
            'galletaInsegura',  //nombre
            'tengoHambre',  //valor
        );
        const mensaje = { mensaje: 'ok'};
        //no se peude suar return cuando se usa Res
        res.send(mensaje);
    }

}
