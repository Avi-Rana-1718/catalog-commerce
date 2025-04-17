import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import {Pool, Client} from "pg"

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy{
 private pool:Pool;
     
    async onModuleInit() {
        this.pool=new Pool({
           connectionString: "postgresql://neondb_owner:npg_Lqtn8ywmN3Td@ep-young-butterfly-a5vdjjhk-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
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