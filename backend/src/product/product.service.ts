import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ProductService {

    constructor (private pool:DatabaseService){}

    async getAll() {
        const result = await this.pool.query('SELECT name, productid, price, discount, images FROM "product" LIMIT 10');

        if(result.type=="SUCCESS") {
            return {type: "SUCCESS", msg: result.data.rows}
        } else {
            return result;
        }
    }

    async getById(id) {
        const result = await this.pool.query('SELECT name, productid, price, discount, images, description FROM "product" WHERE productid = $1', [id]);

        if(result.type=="SUCCESS") {
            return {type: "SUCCESS", msg: result.data.rows[0]};
        } else {
            return result;
        }
    }
}