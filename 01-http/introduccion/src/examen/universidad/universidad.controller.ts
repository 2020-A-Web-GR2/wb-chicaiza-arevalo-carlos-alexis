import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Req, Res, Session
} from '@nestjs/common';
import {UniversidadService} from "./universidad.service";
import {UniversidadEntity} from "./universidad.entity";
import {UniversidadCreateDto} from "./dto/universidad.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('universidad')
export class UniversidadController{

    constructor(
        private readonly _universidadService: UniversidadService,
    ) {
    }

    @Get('home')
    async cargarLogin(
        @Res() res,
        @Query() parametrosConsulta
    ){
        const titulo = "Login";
        const controlador = "login"
        res.render(
            'universidad/loginU',
            {
                titulo: titulo,
                controlador: controlador,
            });
    }

    @Post('login')
    async login(
        @Res() res,
        @Body() parametrosCuerpo,
        @Session() session,
    ){
        const usuario = parametrosCuerpo.username;
        const password = parametrosCuerpo.password;
        if(usuario =='Adrian' && password == '1234'){
            console.log("logueado");
            session.currentUser = usuario;
            console.log(session)
            res.redirect('/universidad/inicio')
        }else{
            const titulo = "Login";
            const controlador = "login";
            const error = "datos incorrectos"
            return res.render(
                'universidad/loginU',
                {
                    titulo: titulo,
                    controlador: controlador,
                    error: error,
                });
        }
    }

    @Get('inicio')
    async inicio(
        @Session() session,
        @Res() res,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado){
            const titulo = "Inicio";
            const controlador = "inicio";

            res.render(
                'universidad/inicioU',
                {
                    titulo: titulo,
                    controlador: controlador,
                    username: session.currentUser,
                });
        }else{
           6)
        }
    }

    @Get("crear")
    async crear(
        @Res() res,
        @Session() session,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado) {
            const titulo = "Crear";
            const controlador = "Crear";

            res.render(
                'universidad/crearU',
                {
                    titulo: titulo,
                    controlador: controlador,
                    username: session.currentUser,
                });
        }
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Session() session,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const universidadNueva = new UniversidadCreateDto()
        universidadNueva.nombreUniversidad = parametrosCuerpo.nombreUniversidad;
        universidadNueva.fundador = parametrosCuerpo.fundador;
        universidadNueva.anioFundacion = parametrosCuerpo.anioFundacion;
        universidadNueva.direccion = parametrosCuerpo.direccion;
        universidadNueva.categoria = parametrosCuerpo.categoria;
        try {
            const errores: ValidationError[] = await validate(universidadNueva)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                const mensajeError = 'No se pudo crear la universidad, informacio incorrecta'
                const controlador = "Crear";
                const titulo = "Crear";

                return res.render('universidad/CrearU',{
                    titulo: titulo,
                    controlador: controlador,
                    error: mensajeError,
                })
            } else {
                console.log("exito")
                const universidadGrabar = new UniversidadEntity()

                universidadGrabar.nombreUniversidad=universidadNueva.nombreUniversidad;
                universidadGrabar.fundador = universidadNueva.fundador;
                universidadGrabar.anioFundacion = universidadNueva.anioFundacion;
                universidadGrabar.direccion = universidadNueva.direccion;
                universidadGrabar.categoria = universidadNueva.categoria;

                let respuestaCreacionUniversidad;
                try {
                    respuestaCreacionUniversidad = await this._universidadService.crearUno(universidadGrabar);
                    console.log("universidad creada")
                    const controlador = "Crear";
                    const titulo = "Crear";
                    const mensaje  = "Universidad creada"
                    const currentUser = session.currentUser
                    return res.render(
                        'universidad/inicioU',
                        {
                            titulo: titulo,
                            controlador: controlador,
                            mensaje: mensaje,
                            username: currentUser,
                        });
                } catch (e) {
                    console.log(e)
                    const controlador = "Crear";
                    const titulo = "Crear";
                    const error  = "No se pudo crear la universidad"
                    const currentUser = session.currentUser
                    return res.render(
                        'universidad/inicioU',
                        {
                            titulo: titulo,
                            controlador: controlador,
                            error: error,
                            username: currentUser,
                        });
                }
            }
        }catch (e) {
            console.log(e)
            const mensajeError = 'No se pudo crear la universidad, informacio incorrecta'
            const controlador = "Crear";
            const titulo = "Crear";
            const mensaje  = "Universidad creada"
            return res.render(
                'universidad/inicioU',
                {
                    titulo: titulo,
                    controlador: controlador,
                    mensaje: mensaje,
                });
        }

    }

    @Post('/inicio/')
    async inicioBusqeda(
        @Session() session,
        @Res() res,
        @Body() parametrosCuerpo,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado){
            const busqueda = parametrosCuerpo.busqueda;
            if(busqueda != ''){
                if(busqueda== 'A' || busqueda=='B'|| busqueda == "C"){
                    try {
                        const consultaCategoria = await this._universidadService.buscarUnoPorCategoria(busqueda);
                        if(consultaCategoria){
                            console.log(consultaCategoria)
                            const controlador = "Crear";
                            const titulo = "Crear";
                            const username = session.currentUser;
                            return res.render(
                                'universidad/inicioU',
                                {
                                    titulo: titulo,
                                    controlador: controlador,
                                    username: username,
                                    consulta: consultaCategoria,
                                });
                        }else{
                            const mensajeError = 'No se encontraron resultados'
                            const controlador = "Crear";
                            const titulo = "Crear";
                            return res.render(
                                'universidad/inicioU',
                                {
                                    titulo: titulo,
                                    controlador: controlador,
                                    error: mensajeError,
                                });
                        }
                    }catch (e) {
                        throw new  InternalServerErrorException("error buscando");
                    }
                }else{

                }
            }else{
                console.log("vacio")

                const titulo = "Inicio";
                const controlador = "inicio";

                res.render(
                    'universidad/inicioU',
                    {
                        titulo: titulo,
                        controlador: controlador,
                        username: session.currentUser,
                    });
            }
        }else{
            return res.redirect('home')
        }
    }

    @Get("editar/:id")
    async editar(
        @Res() res,
        @Session() session,
        @Param() parametrosRuta,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado) {
            const id = parametrosRuta.id
            const consultaUniversidad = await this._universidadService.buscarUno(id)
            console.log(consultaUniversidad)
            const titulo = "Editar";
            const controlador = "Editar";

            res.render(
                'universidad/editarU',
                {
                    titulo: titulo,
                    controlador: controlador,
                    username: session.currentUser,
                    id:id,
                    universidad: consultaUniversidad,
                });
        }
    }

    @Post('editarDesdeVista')
    async editarDesdeVista(
        @Session() session,
        @Body() parametrosCuerpo,
        @Res() res,
    ){
        console.log("cuerpo")
        console.log(parametrosCuerpo)
        const universidadNueva = new UniversidadCreateDto()
        universidadNueva.nombreUniversidad = parametrosCuerpo.nombreUniversidad;
        universidadNueva.fundador = parametrosCuerpo.fundador;
        universidadNueva.anioFundacion = parametrosCuerpo.anioFundacion;
        universidadNueva.direccion = parametrosCuerpo.direccion;
        universidadNueva.categoria = parametrosCuerpo.categoria;
        try {
            const errores: ValidationError[] = await validate(universidadNueva)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                const mensajeError = 'No se pudo editar la universidad, informacio incorrecta'
                const controlador = "Editar";
                const titulo = "Editar";

                return res.render('universidad/EditarU',{
                    titulo: titulo,
                    controlador: controlador,
                    error: mensajeError,
                })
            } else {
                console.log("exito")
                const universidadGrabar = new UniversidadEntity()

                universidadGrabar.nombreUniversidad=universidadNueva.nombreUniversidad;
                universidadGrabar.fundador = universidadNueva.fundador;
                universidadGrabar.anioFundacion = universidadNueva.anioFundacion;
                universidadGrabar.direccion = universidadNueva.direccion;
                universidadGrabar.categoria = universidadNueva.categoria;
                universidadGrabar.id = parametrosCuerpo.id;

                let respuestaEditarUniversidad;
                try {
                    console.log(universidadGrabar)
                    const respuestaEliminar = await this._universidadService.eliminarUno(universidadGrabar.id)
                    respuestaEditarUniversidad = await this._universidadService.editarUno(universidadGrabar)
                    console.log("universidad editada")
                    const controlador = "Editar";
                    const titulo = "Editar";
                    const mensaje  = "Universidad Editada"
                    const currentUser = session.currentUser
                    return res.render(
                        'universidad/inicioU',
                        {
                            titulo: titulo,
                            controlador: controlador,
                            mensaje: mensaje,
                            username: currentUser,
                        });
                } catch (e) {
                    console.log(e)
                    const controlador = "Crear";
                    const titulo = "Crear";
                    const error  = "No se pudo editar la universidad"
                    const currentUser = session.currentUser
                    return res.render(
                        'universidad/inicioU',
                        {
                            titulo: titulo,
                            controlador: controlador,
                            error: error,
                            username: currentUser,
                        });
                }
            }
        }catch (e) {
            console.log(e)
            const mensajeError = 'No se pudo editar la universidad, informacio incorrecta'
            const controlador = "Editar";
            const titulo = "Editar";
            return res.render(
                'universidad/inicioU',
                {
                    titulo: titulo,
                    controlador: controlador,
                    error: mensajeError,
                });
        }

    }
    @Post("eliminar/:id")
    async eliminar(
        @Res() res,
        @Session() session,
        @Param() parametrosRuta,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado) {
            const id = parametrosRuta.id
            const respuestaEliminar = await this._universidadService.eliminarUno(parametrosRuta.id)
            if(respuestaEliminar){
                const titulo = "Inicio";
                const controlador = "Inicio";
                const mensaje = "usuario eliminado"
                res.render(
                    'universidad/inicioU',
                    {
                        titulo: titulo,
                        controlador: controlador,
                        username: session.currentUser,
                        mensaje: mensaje,
                    });
            }else{

            }

        }
    }

    @Get('logout')
    logout(
        @Session() session,
        @Res() res,
        @Req() req,
    ){
        session.currentUser = undefined;
        session.destroy();
        return res.redirect('/home')

    }
}
