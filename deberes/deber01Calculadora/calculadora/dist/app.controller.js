"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const calculadora_create_dto_1 = require("./dtoCalculadora/calculadora.create-dto");
const class_validator_1 = require("class-validator");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async sumar(parametrosConsulta, req, res) {
        if (this.verificarUsuario(req)) {
            const numerosSuma = new calculadora_create_dto_1.CalculadoraSumaCreateDto();
            numerosSuma.n1 = parseFloat(parametrosConsulta.n1);
            numerosSuma.n2 = parseFloat(parametrosConsulta.n2);
            try {
                const errores = await class_validator_1.validate(numerosSuma);
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    res.send("Error validando los numeros");
                }
                else {
                    const suma = numerosSuma.n1 + numerosSuma.n2;
                    const puntajeActual = Number(req.signedCookies["puntaje"]);
                    const puntajeNuevo = puntajeActual - Math.abs(suma);
                    if (puntajeNuevo <= 0) {
                        const nombre = req.cookies["usuario"];
                        const mensaje = {
                            Suma: suma,
                            Advertencia: nombre.concat(" haz terminado tus puntos, se te han restablecido de nuevo")
                        };
                        res.cookie('puntaje', '100', { signed: true });
                        res.send(mensaje);
                    }
                    else {
                        res.cookie('puntaje', puntajeNuevo, { signed: true });
                        const mensaje = {
                            Suma: suma,
                            Puntaje: puntajeNuevo
                        };
                        res.send(mensaje);
                    }
                }
            }
            catch (e) {
                console.error('Error', e);
                throw new common_1.BadRequestException('Error Validando los numeros');
            }
        }
        else {
            res.send("usuario no registrado, registrese en /guardar");
        }
    }
    async restar(parametrosCuerpo, req, res) {
        if (this.verificarUsuario(req)) {
            const numerosResta = new calculadora_create_dto_1.CalculadoraRestaCreateDto();
            numerosResta.n1 = parseFloat(parametrosCuerpo.n1);
            numerosResta.n2 = parseFloat(parametrosCuerpo.n2);
            try {
                const errores = await class_validator_1.validate(numerosResta);
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    res.send("Error validando los numeros");
                }
                else {
                    const resta = numerosResta.n1 - numerosResta.n2;
                    const puntajeActual = Number(req.signedCookies["puntaje"]);
                    const puntajeNuevo = puntajeActual - Math.abs(resta);
                    if (puntajeNuevo <= 0) {
                        const nombre = req.cookies["usuario"];
                        const mensaje = {
                            Resta: resta,
                            Advertencia: nombre.concat(" haz terminado tus puntos, se te han restablecido de nuevo")
                        };
                        res.cookie('puntaje', '100', { signed: true });
                        res.send(mensaje);
                    }
                    else {
                        res.cookie('puntaje', puntajeNuevo, { signed: true });
                        const mensaje = {
                            Resta: resta,
                            Puntaje: puntajeNuevo
                        };
                        res.send(mensaje);
                    }
                }
            }
            catch (e) {
                console.error('Error', e);
                throw new common_1.BadRequestException('Error Validando los numeros');
            }
        }
        else {
            res.send("usuario no registrado, registrese en /guardar");
        }
    }
    async multiplicar(parametrosCabecera, req, res) {
        if (this.verificarUsuario(req)) {
            const numerosMultiplicacion = new calculadora_create_dto_1.CalculadoraMultiplicacionCreateDto();
            numerosMultiplicacion.n1 = parseFloat(parametrosCabecera.n1);
            numerosMultiplicacion.n2 = parseFloat(parametrosCabecera.n2);
            try {
                const errores = await class_validator_1.validate(numerosMultiplicacion);
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    res.send("Error validando los numeros");
                }
                else {
                    const multiplicacion = numerosMultiplicacion.n1 * numerosMultiplicacion.n2;
                    const puntajeActual = Number(req.signedCookies["puntaje"]);
                    const puntajeNuevo = puntajeActual - Math.abs(multiplicacion);
                    if (puntajeNuevo <= 0) {
                        const nombre = req.cookies["usuario"];
                        const mensaje = {
                            Multiplicacion: multiplicacion,
                            Advertencia: nombre.concat(" haz terminado tus puntos, se te han restablecido de nuevo")
                        };
                        res.cookie('puntaje', '100', { signed: true });
                        res.send(mensaje);
                    }
                    else {
                        res.cookie('puntaje', puntajeNuevo, { signed: true });
                        const mensaje = {
                            Multiplicacion: multiplicacion,
                            Puntaje: puntajeNuevo
                        };
                        res.send(mensaje);
                    }
                }
            }
            catch (e) {
                console.error('Error', e);
                throw new common_1.BadRequestException('Error Validando los numeros');
            }
        }
        else {
            res.send("usuario no registrado, registrese en /guardar");
        }
    }
    async dividir(parametrosRuta, req, res) {
        if (this.verificarUsuario(req)) {
            const numerosDivision = new calculadora_create_dto_1.CalculadoraDivisionCreateDto();
            numerosDivision.n1 = parseFloat(parametrosRuta.n1);
            numerosDivision.n2 = parseFloat(parametrosRuta.n2);
            try {
                const errores = await class_validator_1.validate(numerosDivision);
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    res.send("Error validando los numeros, recuerde que n2 no debe ser 0");
                }
                else {
                    const division = numerosDivision.n1 / numerosDivision.n2;
                    const puntajeActual = Number(req.signedCookies["puntaje"]);
                    const puntajeNuevo = puntajeActual - Math.abs(division);
                    if (puntajeNuevo <= 0) {
                        const nombre = req.cookies["usuario"];
                        const mensaje = {
                            Division: division,
                            Advertencia: nombre.concat(" haz terminado tus puntos, se te han restablecido de nuevo")
                        };
                        res.cookie('puntaje', '100', { signed: true });
                        res.send(mensaje);
                    }
                    else {
                        res.cookie('puntaje', puntajeNuevo, { signed: true });
                        const mensaje = {
                            Division: division,
                            Puntaje: puntajeNuevo
                        };
                        res.send(mensaje);
                    }
                }
            }
            catch (e) {
                console.error('Error', e);
                throw new common_1.BadRequestException('Error Validando los numeros');
            }
        }
        else {
            res.send("usuario no registrado, registrese en /guardar");
        }
    }
    async registrarUsuario(parametrosConsulta, req, res) {
        const usuario = new calculadora_create_dto_1.CalculadoraUsuario();
        usuario.userName = parametrosConsulta.usuario;
        try {
            const errores = await class_validator_1.validate(usuario);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                res.send("Error validando el usuario, solo debe usar letras y numeros");
            }
            else {
                res.cookie('usuario', parametrosConsulta.usuario);
                res.cookie('puntaje', '100', { signed: true });
                const aux = "Usuario registrado";
                const mensaje = {
                    Resultado: aux,
                };
                res.send(mensaje);
            }
        }
        catch (e) {
            console.error('Error', e);
            throw new common_1.BadRequestException('Error Validando nombre de usuario');
        }
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }
    verificarUsuario(req) {
        const usuarioRegistrado = req.cookies;
        var aux = false;
        if (usuarioRegistrado['usuario']) {
            aux = true;
        }
        else {
            aux = false;
        }
        return aux;
    }
};
__decorate([
    common_1.Get('suma'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sumar", null);
__decorate([
    common_1.Put('resta'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "restar", null);
__decorate([
    common_1.Delete('multiplicacion'),
    common_1.HttpCode(200),
    __param(0, common_1.Headers()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "multiplicar", null);
__decorate([
    common_1.Post('division/n1/:n1/n2/:n2'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "dividir", null);
__decorate([
    common_1.Get('guardar'),
    common_1.HttpCode(201),
    __param(0, common_1.Query()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "registrarUsuario", null);
__decorate([
    common_1.Get('mostrarCookies'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map