import express, { Request, Response, Router } from "express";
import pool from "../database/db";

const router:Router = express.Router();

interface nRequest extends Request {
    user?: {email: String},
    body: {
        items: [{id: String, quantity:Number}],
        address: {
            name: String,
            address: String,
            mobile: String
        }
    }
}

router.post("/create", async (req:nRequest, res:Response)=>{
    try {
       const orderInserted = await pool.query('INSERT INTO "order" (orderedby, items, address) VALUES ($1, $2::json, $3)', [req.user.email, req.body.items, req.body.address]);
        if(orderInserted.rowCount>=1) {
            res.json({type: "SUCCESS", msg: "Created new order!"});
        } else {
            res.json({type: "ERROR"});
        }
    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
})

router.get("/get", async (req:nRequest, res:Response)=>{
    try {
        const orders= await pool.query('SELECT * FROM "order" WHERE orderedby = $1 ORDER BY orderedat DESC', [req.user.email]);
        if(orders.rowCount>=1) {
            res.json({type: "SUCCESS", msg: orders.rows});
        } else {
            res.json({type: "ERROR"});
        }
    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
})

router.get("/cancel", async (req:nRequest, res:Response)=>{
    try {
        const orderCancelled = await pool.query('UPDATE "order" status="Cancelled" WHERE orderid=$1 AND ordered $2', [req.query.orderID, req.user.email]);

        if(orderCancelled.rows.length>=1) {
            res.json({type: "SUCCESS"});
        } else {
            res.json({type: "ERROR"})
        }

    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
})

export default router;