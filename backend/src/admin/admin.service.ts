import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { ProductDto } from "./dto";

@Injectable()
export class AdminService {
    constructor(private pool:DatabaseService){}


    async addProduct(dto:ProductDto, email: string | undefined) {
        const result = await this.pool.query('INSERT INTO "product" (name, addedby, price, discount, description, images, options, category) VALUES ($1, $2, $3::numeric, $4::numeric, $5, $6, $7::json, $8)', [dto.name, email, dto.price, dto.discount, dto.description, dto.images, dto?.options, dto.category]);
        
        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS", msg: "Successfully added product!"}
        } else {
            return {type: "Error", msg: "Unable to add product."}
        }
    }

    async getProductsByEmail(email: string | undefined) {
        const result = await this.pool.query('SELECT * FROM "product" WHERE addedby = $1', [email])
        if(result.type=="SUCCESS") {
            return {type: "SUCCESS", msg: result.data.rows}
        } else {
            return result;
        }
    }

    async orderStatistic(email: string | undefined) {
        const result = await this.pool.query(`SELECT o.* FROM "order" o WHERE EXISTS (SELECT 1 FROM product p WHERE p.addedby = $1 AND EXISTS (SELECT 1 FROM jsonb_array_elements(o.items) AS item WHERE (item->>'id')::uuid = p.productid));`, [email])
        
        const statObj = {
            total: 0,
            confirmed: 0,
            cancelled: 0,
            revenue: 0,
            revenueToday: 0,
            ordersToday: 0
        }

        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            let currTime = new Date();

            await result.data.rows.forEach((el)=>{
                statObj.total++;
                if(el.status=="Cancelled") {
                    statObj.cancelled++;
                } else {
                    statObj.confirmed++;
                    let orderTime = new Date(el.orderedat)
                    if(orderTime.toDateString()==currTime.toDateString()) {
                        statObj.ordersToday++;
                    }


                    el.items.forEach((e)=>{
                        if(orderTime.toDateString()==currTime.toDateString()) {
                            statObj.revenueToday+=(Number(e.price)*Number(e.quantity));
                        }
                        statObj.revenue+=(Number(e.price)*Number(e.quantity));
                    })
                }
            })
            return {type: "SUCCESS", msg: statObj}
        } else {
            return {type: "ERROR"}
        }

    }

    async getOrders(email: string | undefined) {
        const result = await this.pool.query(`SELECT o.* FROM "order" o WHERE EXISTS (SELECT 1 FROM product p WHERE p.addedby = $1 AND EXISTS (SELECT 1 FROM jsonb_array_elements(o.items) AS item WHERE (item->>'id')::uuid = p.productid)) ORDER BY orderedat DESC`, [email])
        
        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            return {type: "SUCCESS", msg: result.data.rows}
        } else {
            return {type: "ERROR"}
        }
    }

    async editProduct(body:any, email:string|undefined) {
        const productID = body.productID;
        delete body.productID;

        let query = `UPDATE "product" SET `;
        let keys = Object.keys(body);
        let values = Object.values(body);
        values.push(productID)
        values.push(email)

        keys.forEach((el, i)=>{
            query+=`${el} = $${i+1}`;
            if(i!=keys.length-1) {
                query+=", "
            }
        })

        query+=` WHERE productid = $${keys.length+1} AND addedby = $${keys.length+2}`

        const result =await this.pool.query(query, values);

        console.log(query, values);
        

        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            return {type: "SUCCESS"}
        } else {
            return result;
        }
    }

    async deleteProduct(email:string|undefined, productID:string) {
        const result = await this.pool.query('DELETE FROM "product" WHERE productid = $1 AND addedby = $2', [productID, email])
        return result;
    }
}