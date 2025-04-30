import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {Pool} from "pg"

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy{
    private pool:Pool
    constructor(private config:ConfigService) {}
     
    async onModuleInit() {
        this.pool=new Pool({
           connectionString: this.config.get("DB_URL")
        });

        try {
            const client = await this.pool.connect();
            console.log("Connected to DB!");
            client.release();
        } catch (err) {
            console.log("Error connecting to DB", err);
            
        }
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    async query(text: string, values?:any[]): Promise<{type:string, data?:any, msg?:any}> {
        const client = await this.pool.connect();

        try {
            const result = await client.query(text, values);            
            return {type: "SUCCESS", data: result};
        } catch (err) {
            return {type: "ERROR", msg: err};
        } finally {
            client.release();
        }

    }
}