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
    IsAlphanumeric,
    IsNotEmpty,
    IsNumber,
    NotEquals
} from "class-validator";

export class  CalculadoraSumaCreateDto {
    //@NotEquals(0)
    @IsNumber()
    @IsNotEmpty()
    n1:number;

    @IsNumber()
    @IsNotEmpty()
    n2:number;
}
export class  CalculadoraRestaCreateDto {
    //@NotEquals(0)
    @IsNumber()
    @IsNotEmpty()
    n1:number;

    @IsNumber()
    @IsNotEmpty()
    n2:number;
}

export class  CalculadoraMultiplicacionCreateDto {
    //@NotEquals(0)
    @IsNumber()
    @IsNotEmpty()
    n1:number;

    @IsNumber()
    @IsNotEmpty()
    n2:number;
}

export class  CalculadoraDivisionCreateDto {

    @IsNumber()
    @IsNotEmpty()
    n1:number;

    @IsNumber()
    @IsNotEmpty()
    @NotEquals(0)
    n2:number;
}

export class  CalculadoraUsuario {

    @IsNotEmpty()
    @IsAlphanumeric()
    userName:string;
}