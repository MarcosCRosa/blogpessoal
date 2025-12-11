import { Module } from "@nestjs/common";
import { Bcrpyt } from "./bcrypt/bcrypt";

@Module({
    imports: [],
    providers: [Bcrpyt],
    controllers: [],
    exports: [Bcrpyt],
})
export class AuthModule {

};