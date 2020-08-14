import {
    IsAlpha, IsDate, IsDateString,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsPositive,
    Length,
    MaxLength
} from "class-validator";

export class UsuarioUpdateDto{

    @IsAlpha()
    @IsOptional()
    @MaxLength(60)
    nombre?: string;

    @IsAlpha()
    @IsOptional()
    @MaxLength(60)
    apellido?: string;

    @IsNumberString()
    @Length(10,10)
    @IsNotEmpty()
    cedula: string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    sueldo?: number;

    @IsOptional()
    @IsDate()
    fechaNacimiento?: string;

    @IsOptional()
    @IsDateString()
    fechaHoraNacimiento?: string;
}