import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}
    
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario:Usuario):Promise<Usuario | null>{
     return await this.usuarioService.create(usuario)
    }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll():Promise<Usuario[]>{
        return this.usuarioService.findAll()
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id',ParseIntPipe)id:number): Promise<Usuario> {
        return this.usuarioService.findById(id);
    }
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update (@Body() usuario:Usuario):Promise<Usuario> {
    return this.usuarioService.update(usuario);
    }
}