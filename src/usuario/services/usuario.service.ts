import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { Bcrpyt } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrpyt: Bcrpyt,
  ){}
  async findByUsuario(usuario: string):Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
        where:{usuario:usuario},
    });
  }
  async create(usuario:Usuario):Promise<Usuario> {
   const buscaUsuario = await this.findByUsuario(usuario.usuario);
   if(buscaUsuario)
    throw new HttpException('O usuario ja existe!',HttpStatus.BAD_REQUEST);
   usuario.senha = await this.bcrpyt.criptgrofarSenha(usuario.senha)
   return await this.usuarioRepository.save(usuario)
  }
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find()
  }
  async findById(id:number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
        where:{id}
    });
    if(!usuario)
        throw new HttpException('Usuario não encontrado!',HttpStatus.NOT_FOUND);
    return usuario;
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if(buscaUsuario && buscaUsuario.id !== usuario.id)
        throw new HttpException('Usuario (e-mail) já Cadastrado!',HttpStatus.BAD_REQUEST);
    usuario.senha = await this.bcrpyt.criptgrofarSenha(usuario.senha)
    return await this.usuarioRepository.save(usuario);
  }

}