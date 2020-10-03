import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Index([
    'nombreUniversidad',
    'fundador',
    'anioFundacion',
    'direccion',
    'categoria',
])
@Index(
    ['nombreUniversidad'],
    {unique: true}
)
@Entity('db_universidad')
export class UniversidadEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombreUniversidad',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    nombreUniversidad?: string

    @Column({
        name: 'fundador',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    fundador?: string

    @Column({
        name: 'anioFundacion',
        type: 'date',
        nullable: true,
    })
    anioFundacion?: string

    @Column({
        name: 'direccion',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    direccion?: string

    @Column({
        name: 'categoria',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    categoria?: string
}