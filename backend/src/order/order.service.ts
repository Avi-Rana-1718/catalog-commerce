import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { OrderDto } from "./dto";

@Injectable()
export class OrderService {
    constructor(private pool:DatabaseService){}

   async getOrdersByEmail(email:string|undefined) {
        if(typeof email == undefined) {
            return {type:"ERROR", msg: "Undefined email"}
        }

        const result = await this.pool.query('SELECT * FROM "order" WHERE orderedby = $1 ORDER BY orderedat DESC', [email]);

        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            return {type:"SUCCESS", msg: result.data.rows};
        } else {
            return {type: "ERROR", msg: "Unable to find any orders!"};
        }
    }

    async createOrder(email:string|undefined, dto:OrderDto) {
        if(typeof email == undefined) {
            return {type:"ERROR", msg: "Undefined email"}
        }

        const result = await this.pool.query('INSERT INTO "order" (orderedby, items, address) VALUES ($1, $2::json, $3)', [email, dto.items, dto.address]);
        console.log(dto.items);
        
        //reduce stock - # check stock as per size
        let itemsProcessed = 0;
        JSON.parse(dto.items).forEach(async (el)=>{
           // await this.pool.query('UPDATE "product" SET stock = stock - $1 WHERE productid = $2', [el.quantity, el.id]);
            itemsProcessed++;
        })

        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS", msg: "New ordered created!"}
        } else {
            return result;
        }
    }

    async cancelOrder(email:string|undefined, orderID:string) {

        const result = await this.pool.query(`UPDATE "order" SET status = 'Cancelled' WHERE orderid = $1 AND orderedby = $2`, [orderID, email]);
        
        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            return {type: "SUCCESS", msg: "Cancelled order"};
        } else {
            return result;
        }
        
    }
}