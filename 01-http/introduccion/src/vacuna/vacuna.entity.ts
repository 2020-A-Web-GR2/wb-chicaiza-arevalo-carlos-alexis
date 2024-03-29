import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity()
export class VacunaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    //creacion de relaciones
    //vacuna a mascota
    @ManyToOne(
        type => MascotaEntity,
        mascota => mascota.vacunas
    )
    mascota: MascotaEntity;
}