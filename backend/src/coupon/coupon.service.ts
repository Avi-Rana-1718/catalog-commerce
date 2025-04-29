import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CouponDto } from "./dto";

@Injectable()
export class CouponService {
    constructor(private pool:DatabaseService){}

    async getCouponsByEmail(email:string|undefined) {
        const result = await this.pool.query(`SELECT * FROM "coupon" WHERE createdby = $1`, [email]);

        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            return {type: "SUCCESS", msg: result.data.rows}
        } else if(result.type=="SUCCESS") {
            return {type: "ERROR", msg: "No coupons found!"}
        } else {
            return result;
        }
    }

    async createCoupon(email:string|undefined, dto:CouponDto) {
        const result = await this.pool.query(`INSERT INTO "coupon" (code, discount, expiresat, maxuses, createdby) VALUES ($1, $2, $3, $4, $5)`, [dto.coupon.toUpperCase(), dto.discount, dto.expiresAt, dto.maxUses, email])
        
        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS", msg: "Successfully created coupon!"};
        } else {
            return {type: "ERROR", msg: "Unable to create coupon"}
        }
    }

    async deleteCoupon(email:string|undefined, code:string) { 
        const result = await this.pool.query(`DELETE FROM "coupon" WHERE code = $1 AND createdby = $2`, [code.toUpperCase(), email]);

        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS", msg: "Successfully deleted the coupon!"};
        } else {
            return {type: "ERROR", msg: "Unable to delete the coupon"}
        }

    }

    async isCouponValid(code:string) {
        const result = await this.pool.query(`SELECT * FROM "coupon" WHERE code = $1 LIMIT 1`, [code.toUpperCase()]);
 
        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            const currTime = new Date()
            const couponTime = new Date(result?.data?.rows[0]?.expiresat);

            if(result.data.rows[0].uses<result.data.rows[0].maxuses && currTime < couponTime) {
                return {type: "SUCCESS", msg: "Coupon is valid", data: result.data.rows[0].discount}
            } else {
                return {type: "ERROR", msg: "Coupon has expired!"}
            }

        } else {
            return {type: "ERROR", msg: "Coupon does not exist!"};
        }
    }

    async redeemCoupon(code:string) {
        const valid = await this.isCouponValid(code);
        if(valid.type=="ERROR") {
            return valid;
        }
        const result = await this.pool.query(`SELECT * FROM "coupon" WHERE code = $1 AND NOT maxuses = uses LIMIT 1`, [code.toUpperCase()]);

        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            const increaseUse = await this.pool.query(` UPDATE "coupon" SET uses = uses+1 WHERE CODE = $1`, [code.toUpperCase()]);
            if(increaseUse.type=="SUCCESS" && increaseUse.data.rowCount==1) {
                return {type: "SUCCESS", msg: "Successfully redeemed coupon!"}
            } else {
                return {type:"ERROR", msg: "Unable to redeem coupon!"}
            }
        } else {
            return {type:"ERROR", msg: "Unable to redeem coupon!"}
        }
    }


}