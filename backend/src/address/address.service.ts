import { DatabaseService } from "src/database/database.service";
import { AddressDto } from "./dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressService {
    constructor(private pool:DatabaseService){}

    async getAddressByEmail(email:string | undefined) {
        const result = await this.pool.query(`SELECT * FROM "address" where addedby = $1`, [email]);

        if(result.type=="SUCCESS" && result.data.rowCount>=1) {
            return {type: "SUCCESS", msg: result.data.rows};
        } else {
            return {type: "ERROR", msg: "Unable to find addresses for this email"}
        }
    }

    async createAddress(email:string | undefined, dto:AddressDto) {
        const result = await this.pool.query(`INSERT INTO "address" (addedby, name, location, mobile) VALUES ($1, $2, $3, $4)`, [email, dto.name, dto.location, dto.mobile]);

        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS", msg: "Successfully added address!"};
        } else {
            return {type: "ERROR", msg: "Unable to add address"}
        }
    }

    async deleteAddress(email:string | undefined, addressID:string) {
        const result = await this.pool.query(`DELETE FROM "address" WHERE addressid = $1 AND addedby = $2`, [addressID, email]);
        console.log(email, addressID);
        
        if(result.type=="SUCCESS" && result.data.rowCount==1) {
            return {type: "SUCCESS", msg: "Successfully deleted the address!"};
        } else {
            return {type: "ERROR", msg: "Unable to delete the address"}
        }
    }
}