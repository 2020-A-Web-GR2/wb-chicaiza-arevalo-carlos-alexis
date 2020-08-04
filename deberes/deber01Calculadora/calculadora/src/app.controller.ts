import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post, Put,
    Query, Req, Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {
    CalculadoraDivisionCreateDto,
    CalculadoraMultiplicacionCreateDto,
    CalculadoraRestaCreateDto,
    CalculadoraSumaCreateDto, CalculadoraUsuario
} from "./dtoCalculadora/calculadora.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('suma')
    @HttpCode(200)
    async sumar(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res
    ) {
      if(this.verificarUsuario(req)) {
          const numerosSuma = new CalculadoraSumaCreateDto()
          numerosSuma.n1 = parseFloat(parametrosConsulta.n1)
          numerosSuma.n2 = parseFloat(parametrosConsulta.n2)
          //validacion
          try {
              const errores: ValidationError[] = await validate(numerosSuma)
              if (errores.length > 0) {
                  console.error('Errores: ', errores);
                  return "Error validando los numeros";
              } else {
                  const suma = numerosSuma.n1 + numerosSuma.n2;
                  const mensaje = {Suma: suma};
                  res.send(mensaje);
              }
          } catch (e) {
              console.error('Error', e);
              throw  new BadRequestException('Error Validando los numeros')
          }
          //validacion
      }else{
          res.send("usuario no registrado");
      }
    }

    @Put('resta')
    @HttpCode(201)
    async restar(
        @Body() parametrosCuerpo,
        @Req() req,
        @Res() res
    ) {
        const numerosResta = new CalculadoraRestaCreateDto()
        numerosResta.n1 = parseFloat(parametrosCuerpo.n1)
        numerosResta.n2 = parseFloat(parametrosCuerpo.n2)
        //validacion
        try {
            const errores: ValidationError[] = await validate(numerosResta)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                return "Error validando los numeros"
            } else {
                const resta = numerosResta.n1-numerosResta.n2;
                const mensaje = {Resta: resta};
                return mensaje
            }
        } catch (e) {
            console.error('Error', e);
            throw  new BadRequestException('Error Validando los numeros')
        }
        //validacion
    }

    @Delete('multiplicacion')
    @HttpCode(200)
    async multiplicar(
        @Headers() parametrosCabecera,
        @Req() req,
        @Res() res
    ) {
        const numerosMultiplicacion = new CalculadoraMultiplicacionCreateDto()
        numerosMultiplicacion.n1 = parseFloat(parametrosCabecera.n1)
        numerosMultiplicacion.n2 = parseFloat(parametrosCabecera.n2)
        //validacion
        try {
            const errores: ValidationError[] = await validate(numerosMultiplicacion)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                return "Error validando los numeros"
            } else {
                const multiplicacion = numerosMultiplicacion.n1*numerosMultiplicacion.n2;
                const mensaje = {Multiplicacion: multiplicacion};
                return mensaje
            }
        } catch (e) {
            console.error('Error', e);
            throw  new BadRequestException('Error Validando los numeros')
        }
        //validacion
    }

    @Post('division/n1/:n1/n2/:n2')
    @HttpCode(201)
    async dividir(
        @Param() parametrosRuta,
        @Req() req,
        @Res() res
    ) {
        const numerosDivision = new CalculadoraDivisionCreateDto()
        numerosDivision.n1 = parseFloat(parametrosRuta.n1)
        numerosDivision.n2 = parseFloat(parametrosRuta.n2)
        //validacion
        try {
            const errores: ValidationError[] = await validate(numerosDivision)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                return "Error validando los numeros, recuerde que n2 no debe ser 0"
            } else {
                const division = numerosDivision.n1/numerosDivision.n2;
                const mensaje = {Division: division};
                return mensaje
            }
        } catch (e) {
            console.error('Error', e);
            throw  new BadRequestException('Error Validando los numeros')
        }
        //validacion
    }

    @Get('guardar')
    @HttpCode(201)
    async registrarUsuario(
        @Query() parametrosConsulta,
        @Req()  req,
        @Res()  res
    ) {
        const usuario = new CalculadoraUsuario()
        usuario.userName = parametrosConsulta.usuario
        //validacion
        try {
            const errores: ValidationError[] = await validate(usuario)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                res.send("Error validando el usuario, solo debe usar letras y numeros")
            } else {
                res.cookie('usuario', parametrosConsulta.usuario);
                res.cookie('puntaje', '100', {signed: true});
                const aux = "Usuario registrado"
                const mensaje = {
                    Resultado: aux,
                }
                res.send(mensaje)
            }
        } catch (e) {
            console.error('Error', e);
            throw  new BadRequestException('Error Validando nombre de usuario')
        }
        //validacion
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const mensaje={
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }
        return mensaje;
    }

    verificarUsuario(
        req
    ): boolean{
        const usuarioRegistrado: object = req.cookies;
        var aux = false;
        if(usuarioRegistrado['usuario']){
            aux = true;
        }else{
            aux = false;
        }
        return aux;
    }
  
}
