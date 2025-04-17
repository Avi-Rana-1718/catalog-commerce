import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService{
    
    constructor(private pool:DatabaseService){}

    async signup(dto:AuthDto) {

        const result = await this.pool.query('INSERT INTO "user" (email, password, username) VALUES ($1, $2, $3)', [dto.email, dto.password, dto.username]);

        if(result.type=="SUCCESS" && result.data.rowCount>0) {
            return {type: "SUCCESS", msg: "Created new user"};
        } else {
            return result;
        }
    }

    login() {}
}; 