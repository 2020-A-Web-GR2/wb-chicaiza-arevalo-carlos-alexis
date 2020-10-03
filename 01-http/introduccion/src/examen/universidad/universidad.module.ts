import {Module} from '@nestjs/common';
import {UniversidadController} from './universidad.controller';
import {UniversidadService} from './universidad.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UniversidadEntity} from "./universidad.entity";

@Module({
    controllers: [
        UniversidadController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    UniversidadEntity
                ],
                'default'   //nombre cadena conexion
            )
    ],
    providers: [
        UniversidadService
    ]
})
export class UniversidadModule {

}