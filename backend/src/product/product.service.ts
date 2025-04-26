import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ProductService {

    constructor (private pool:DatabaseService){}

    async getAll() {
        const result = await this.pool.query('SELECT name, productid, price, discount, images, options FROM "product" ORDER BY addedat DESC');

        if(result.type=="SUCCESS") {
            return {type: "SUCCESS", msg: result.data.rows}
        } else {
            return result;
        }
    }

    async getById(id:string) {
        const result = await this.pool.query('SELECT name, productid, price, discount, images, description, options FROM "product" WHERE productid = $1', [id]);

        if(result.type=="SUCCESS") {
            return {type: "SUCCESS", msg: result.data.rows[0]};
        } else {
            return result;
        }
    }

    async getByCategory(id:string) {
        const result = await this.pool.query('SELECT name, productid, price, discount, images, description, options FROM "product" WHERE category && $1', [id]);

        if(result.type=="SUCCESS") {
            return {type: "SUCCESS", msg: result.data.rows};
        } else {
            return result;
        }
    }

    async getByName(name:string) {
        const result = await this.pool.query('SELECT name, productid, price, discount, images, options FROM "product" WHERE LOWER(name) LIKE $1', [`%${name.toLowerCase()}%`]);

        if(result.type=="SUCCESS" && result.data.rowCount>0) {
            return {type: "SUCCESS", msg: result.data.rows}
        } else {
            return {type: "ERROR"}
        }
    }
}