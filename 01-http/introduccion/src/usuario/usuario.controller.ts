import {Body, Controller, Get, Param, Post} from '@nestjs/common';

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
    @Get()
    mostrarTodos(){
        return this.arregloUsuario
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ) {
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };
        this.arregloUsuario.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }


    @Get(':id')
    verUno(
        @Param() parametosRuta
    ){
        const  indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametosRuta.id)
            (usuario) => usuario.id === Number(parametosRuta.id)
        )
        return this.arregloUsuario[indice];
    }
}