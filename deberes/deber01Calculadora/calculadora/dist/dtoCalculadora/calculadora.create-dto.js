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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculadoraUsuario = exports.CalculadoraDivisionCreateDto = exports.CalculadoraMultiplicacionCreateDto = exports.CalculadoraRestaCreateDto = exports.CalculadoraSumaCreateDto = void 0;
const class_validator_1 = require("class-validator");
class CalculadoraSumaCreateDto {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CalculadoraSumaCreateDto.prototype, "n1", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CalculadoraSumaCreateDto.prototype, "n2", void 0);
exports.CalculadoraSumaCreateDto = CalculadoraSumaCreateDto;
class CalculadoraRestaCreateDto {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CalculadoraRestaCreateDto.prototype, "n1", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CalculadoraRestaCreateDto.prototype, "n2", void 0);
exports.CalculadoraRestaCreateDto = CalculadoraRestaCreateDto;
class CalculadoraMultiplicacionCreateDto {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CalculadoraMultiplicacionCreateDto.prototype, "n1", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CalculadoraMultiplicacionCreateDto.prototype, "n2", void 0);
exports.CalculadoraMultiplicacionCreateDto = CalculadoraMultiplicacionCreateDto;
class CalculadoraDivisionCreateDto {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CalculadoraDivisionCreateDto.prototype, "n1", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.NotEquals(0),
    __metadata("design:type", Number)
], CalculadoraDivisionCreateDto.prototype, "n2", void 0);
exports.CalculadoraDivisionCreateDto = CalculadoraDivisionCreateDto;
class CalculadoraUsuario {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsAlphanumeric(),
    __metadata("design:type", String)
], CalculadoraUsuario.prototype, "userName", void 0);
exports.CalculadoraUsuario = CalculadoraUsuario;
//# sourceMappingURL=calculadora.create-dto.js.map