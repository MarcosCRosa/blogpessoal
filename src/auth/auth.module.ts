import { forwardRef, Module } from "@nestjs/common";
import { Bcrpyt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { localStrategy } from "./strategy/local.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        forwardRef(()=>UsuarioModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn:'1h'},

        }),
    ],
    providers: [Bcrpyt,AuthService,localStrategy,JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrpyt],
})
export class AuthModule {

};