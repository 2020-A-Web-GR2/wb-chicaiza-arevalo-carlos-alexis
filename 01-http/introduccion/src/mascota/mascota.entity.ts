import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;


    //creacion de relacion
    //mascota a usuario
    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.mascotas
    )
    usuario: UsuarioEntity;

    //mascota a vacuna
    @OneToMany(
        // type => VacunaEntity, campoRelacion
        type => VacunaEntity,
        vacuna => vacuna.mascota
    )
    vacunas: VacunaEntity[];
}