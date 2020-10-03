import {
    IsAlpha, IsDate, IsDateString, IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsPositive, IsString,
    Length,
    MaxLength
} from "class-validator";

export class UniversidadCreateDto{

    @IsString()
    @IsOptional()
    @MaxLength(60)
    nombreUniversidad?: string;

    @IsString()
    @IsOptional()
    @MaxLength(60)
    fundador?: string;

    @IsNotEmpty()
    @IsISO8601()
    anioFundacion:string;

    @IsString()
    @IsOptional()
    @MaxLength(60)
    direccion?: string;

    @IsString()
    @IsOptional()
    @MaxLength(1)
    categoria?: string;
}
