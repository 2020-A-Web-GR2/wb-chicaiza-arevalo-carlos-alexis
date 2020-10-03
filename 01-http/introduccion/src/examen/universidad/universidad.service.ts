import {Injectable} from '@nestjs/common';
import {FindManyOptions, Like, Not, Repository} from "typeorm";
import {UniversidadEntity} from "./universidad.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class UniversidadService {
    constructor(        //inyeccion de dependencias
        @InjectRepository(UniversidadEntity)
        private repositorio: Repository<UniversidadEntity>
    ){
    }
    crearUno(nuevaUniversidad: UniversidadEntity){
        return this.repositorio.save(nuevaUniversidad) //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOneOrFail(id)    //promesa
    }

    editarUno(universidadEditada:UniversidadEntity){
        return this.repositorio.save(universidadEditada);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
    buscarTodos() {
        const consulta : FindManyOptions<UniversidadEntity> = {
            select:[
                'nombreUniversidad',
                'fundador',
                'anioFundacion',
                'direccion',
                'categoria',
            ],
        }
        return this.repositorio.find(consulta)
    }
    buscarUnoPorNombre(nombreUniversidad:string) {
        const consulta : FindManyOptions<UniversidadEntity> = {
            select:[
                'id',
                'nombreUniversidad',
                'fundador',
                'anioFundacion',
                'direccion',
                'categoria',
            ],where: [
                {
                    nombreUniversidad: nombreUniversidad
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    buscarUnoPorCategoria(categoriaUniversidad:string) {
        const consulta : FindManyOptions<UniversidadEntity> = {
            select:[
                'id',
                'nombreUniversidad',
                'fundador',
                'anioFundacion',
                'direccion',
                'categoria',
            ],where: [
                {
                    categoria: categoriaUniversidad
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

}