import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

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
        console.log(parametrosCuerpo)
        console.log(nuevoUsuario)
        this.arregloUsuario.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }


    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const  indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametrosRuta.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuario[indice];
    }

    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const  indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametrosRuta.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuario[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuario[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const  indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametrosRuta.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuario.splice(indice,1)
        return this.arregloUsuario[indice];
    }
}