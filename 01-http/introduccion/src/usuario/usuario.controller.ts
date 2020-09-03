import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";

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
        private  readonly _usuarioService: UsuarioService,
        private  readonly _mascotaService: MascotaService,
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

    @Post('crearUsuarioyMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        //validar usuario y mascota
        //creacion

        let usuarioCreado;
        try{
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        }catch (e) {
            console.error(e);
            throw  new InternalServerErrorException({
                mensaje: 'Error creando usuario'
            })
        }

        if(usuarioCreado){
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
            }catch (e) {
                console.error(e);
                throw  new InternalServerErrorException({
                    mensaje: 'Error creando mascota'
                })
            }

            if(mascotaCreada){
                return{
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            }else{
                throw  new InternalServerErrorException({
                    mensaje: 'Errore creando mascota'
                })
            }
        }else{
            throw new InternalServerErrorException({
                mensaje: 'Error creando usario y mascota'
            })
        }
    }

    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Carlos';
        res.render(
            'ejemplo',//nombre de la vista(archivo)
            {//parametros de la vista
                nombre: nombreControlador,//
            }
        )
    }

    @Get('vista/faq')
    faq(
        @Res() res
    ){
        res.render('usuario/faq')
    }

    @Get('vista/inicio')
    async inicio(
        @Res() res
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos();
        }catch (e) {
            throw  new InternalServerErrorException("Error encontrando usuarios")
        }
        if(resultadoEncontrado) {
            res.render('usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado
                });
        }else{
            throw  new NotFoundException('No se encontraron usuarios')
        }
    }

    @Get('vista/login')
    login(
        @Res() res
    ){
        res.render('usuario/login')
    }

    @Get('vista/crear')
    crearUsuarioVista(
        @Res() res
    ){
        res.render('usuario/crear')
    }
}