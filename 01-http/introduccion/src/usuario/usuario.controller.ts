import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
    public arregloUsuario = [
        {
            id: 1,
            nombre: 'Adrian'
        },
        {
            id:2,
            nombre: 'Vicente'
        },
        {
            id:3,
            nombre: 'Wendy'
        }
    ]
    public idActual = 3;

    //Inyeccion de dependencias
    constructor(
        private  readonly _usuarioService: UsuarioService
    ){

    }


    @Get()
    async mostrarTodos(){
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            });
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        try{
            //validacion DTO

            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }


    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        try{
            const respuesta = await  this._usuarioService
                .buscarUno(Number(parametrosRuta.id));
            return  respuesta;
        }catch (e) {
            console.error(e);
            throw  new NotFoundException({
                mensaje: 'no existe el registro'
            });
        }
    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try{
            const respuesta = await  this._usuarioService
                .editarUno(usuarioEditado)
            return  respuesta;
        }catch (e) {
            console.error(e);
            throw  new NotFoundException({
                mensaje: 'no existe el registro'
            });
        }
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try{
            const respuesta = await  this._usuarioService
                .eliminarUno(id)
            const mensaje = {
                resultado: 'Registro con id '+id+' eliminado'
            };
            return  mensaje;
        }catch (e) {
            console.error(e);
            throw  new NotFoundException({
                mensaje: 'no existe el registro'
            });
        }

    }
}