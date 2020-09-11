import {Injectable} from '@nestjs/common';
import {FindManyOptions, Like, Not, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class UsuarioService {
    constructor(        //inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ){
    }
    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) //promesa
    }

    buscarTodos(textoDeConsulta?: string) {
        /*let busquedaEjemplo: FindManyOptions<UsuarioEntity>
        //buscr y relacionar
        busquedaEjemplo= {
            relations: ['mascotas','mascotas.vacunas']
        }
        //buscar where
        busquedaEjemplo= {
            where:{
                nombre: 'Carlos',//busqueda exacta
                apellido: 'Chicaiza'
            }
        }

        busquedaEjemplo = {
            order:{
                nombre: 'ASC', //ascendente
                id:'DESC'   //descenente
            }
        }

        busquedaEjemplo={
            //primera pagina
            //skip:0, //de 100 registros saltate 0 registros
            //take:10 //de100 registrosm agarra 10 registros
            //segunda pagina
            //skip:10, //de 100 registros saltate 0 registros
            //take:10 //de100 registrosm agarra 10 registros
            //tercera pagina
            skip:20,
            take:10
        }
        //busqueda where y OR
        busquedaEjemplo = {
            where:[
                {
                    nombre: 'Carlos',
                    tipoUsuario:1
                },
                {
                    apellido: 'Chicaiza'
                }
            ]
        }

        //busqueda not
        busquedaEjemplo={
            where: {
                nombre: Not('carlos')
            }
        }*/
        const consulta: FindManyOptions<UsuarioEntity> = {
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    apellido: Like(`%${textoDeConsulta}%`)
                },
                {
                    cedula: Like(`%${textoDeConsulta}%`)
                }
            ]
        }

        return this.repositorio.find(consulta) // promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOneOrFail(id)    //promesa
    }

    editarUno(usuarioEditado:UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

    //usuario tiene varias mascotas
    //mascota tiene varias vacunas

}