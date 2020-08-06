import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sumar(parametrosConsulta: any, req: any, res: any): Promise<void>;
    restar(parametrosCuerpo: any, req: any, res: any): Promise<void>;
    multiplicar(parametrosCabecera: any, req: any, res: any): Promise<void>;
    dividir(parametrosRuta: any, req: any, res: any): Promise<void>;
    registrarUsuario(parametrosConsulta: any, req: any, res: any): Promise<void>;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    verificarUsuario(req: any): boolean;
}
