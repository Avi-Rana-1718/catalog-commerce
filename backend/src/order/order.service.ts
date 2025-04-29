import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { OrderDto } from "./dto";
import { CouponService } from "src/coupon/coupon.service";

@Injectable()
export class OrderService {
    constructor(private pool:DatabaseService, private couponService:CouponService){}

   async getOrdersByEmail(email:string|undefined, offset:number) {
        if(typeof email == undefined) {
            return {type:"ERROR", msg: "Undefined email"}
        }

        let limit = 10;

        const result = await this.pool.query('SELECT * FROM "order" WHERE orderedby = $1 ORDER BY orderedat DESC LIMIT 10 OFFSET $2', [email, (offset-1)*limit]);

        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            let data = {
                totalPages: Math.ceil(((await this.pool.query('SELECT COUNT(*) FROM "order"'))).data.rows[0].count/limit),
                rows: result.data.rows
            }
            return {type:"SUCCESS", msg: data};
        } else {
            return {type: "ERROR", msg: "Unable to find any orders!"};
        }
    }

    async createOrder(email:string|undefined, dto:OrderDto) {
        if(typeof email == undefined) {
            return {type:"ERROR", msg: "Undefined email"}
        }

        const result = await this.pool.query('INSERT INTO "order" (orderedby, items, address) VALUES ($1, $2::json, $3)', [email, dto.items, dto.address]);
        console.log(dto);
        
        //reduce stock - # check stock as per size
        let itemsProcessed = 0;
        JSON.parse(dto.items).forEach(async (el)=>{
           //reduce
            itemsProcessed++;
        })

        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            if((await this.couponService.redeemCoupon(dto.coupon)).type=="ERROR") {
                console.log("Unable to redeem coupon!");
            }
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