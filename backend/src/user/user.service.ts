import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UserService{
    constructor(private pool:DatabaseService){}

    async getUser(userObj) {
        return {type: "SUCCESS", msg: userObj}
    }

    async deleteUser(userObj) {
        const result = await this.pool.query(`DELETE FROM "user" WHERE email = $1`, [userObj.email]);
        
        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS", msg: "User deleted!"}
        } else {
            return {type: "ERROR", msg: "Unable to find user!"};
        }
    }

    async editUsername(username:string, userObj) {
        console.log(username, userObj);
        
        const result = await this.pool.query(`UPDATE "user" SET username = $1 WHERE email = $2`, [username, userObj.email]);
        
        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS"}
        } else {
            return {type:"ERROR", msg: "Invalid email"}
        }
        
    }
}