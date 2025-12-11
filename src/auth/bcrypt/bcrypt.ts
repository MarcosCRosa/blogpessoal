import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class Bcrpyt {
  async criptgrofarSenha(senha: string): Promise<string> {
    const saltos: number = 10;
    return await hash(senha,saltos)
  }
  async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<Boolean> {
    return await compare (senhaDigitada,senhaBanco);
  }
}