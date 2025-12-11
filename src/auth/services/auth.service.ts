import { Bcrpyt } from './../bcrypt/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { UsuarioSemSenha } from '../interfaces/usuario-sem-senha.interface';

@Injectable()
export class AuthService {
constructor(
    private UsuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrpyt
){}
  async validateUser(username:string,password:string):Promise<UsuarioSemSenha> {
    const buscaUsuario = await this.UsuarioService.findByUsuario(username);

    if(!buscaUsuario){
        throw new HttpException('Usúario não encontrado!',HttpStatus.NOT_FOUND);
    }
    const matchPassword = await this.bcrypt.compararSenhas(password,buscaUsuario.senha);

    if(!matchPassword){
     throw new HttpException('Senha invalida!',HttpStatus.UNAUTHORIZED);
    }
    const { senha, ...resposta } = buscaUsuario;
    return resposta;
  }

  async login (usuarioLogin: UsuarioLogin) {
    const payload = {sub: usuarioLogin.usuario};
    const buscaUsuario = await this.UsuarioService.findByUsuario(usuarioLogin.usuario);
   if(!buscaUsuario){
    throw new HttpException('Usuario não encontrado!',HttpStatus.NOT_FOUND)
   }
    return {
        id: buscaUsuario?.id,
        nome: buscaUsuario?.nome,
        usuario: buscaUsuario?.usuario,
        foto: buscaUsuario?.foto,
        token: `Bearer ${this.jwtService.sign(payload)}`,
    }
  }
}
