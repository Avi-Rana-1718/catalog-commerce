import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UserService{
    constructor(private pool:DatabaseService){}

    async getUser(userObj) {
        return {type: "SUCCESS", msg: userObj}
    }
}