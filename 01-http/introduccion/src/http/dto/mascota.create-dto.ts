//@IsAlpha()
//@IsNotEmpty()
//@MinLength()
//@MaxLength()
//@IsBoolean()
//@IsEmpty()
//IsInt()
//IsPositive()
//IsOptional()
//IsNumber()
import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class  MascotaCreateDto {
    //3-60 long
    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombre:string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad:number;//enteros

    @IsNotEmpty()
    @IsBoolean()
    casado:boolean;

    @IsOptional()
    @IsBoolean()
    castro?:boolean;//opcional

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    peso:number;//decimales
}