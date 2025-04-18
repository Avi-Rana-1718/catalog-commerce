import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class OrderService {
    constructor(private pool:DatabaseService){}

   async getOrdersByEmail(email:string|undefined) {
        if(typeof email == undefined) {
            return {type:"ERROR", msg: "Undefined email"}
        }

        const result = await this.pool.query('SELECT * FROM "order" WHERE orderedby = $1', [email]);

        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            return {type:"SUCCESS", msg: result.data.rows};
        } else {
            return result;
        }
    }
}