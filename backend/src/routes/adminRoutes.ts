import express, { Request, Response, Router } from "express";
import pool from "../database/db";

const router:Router = express.Router();

interface nRequest extends Request {
    user?: {email: String},
    body: {
        name: String,
        price: Number,
        discount: Number,
        images: String[],
        description: String,
        productID?: String
    }
}

router.post("/addProduct", async (req:nRequest, res:Response)=>{
    try {
        console.log(req.body);
        
        const productInserted = await pool.query('INSERT INTO "product" (name, addedBy, price, discount, description) VALUES ($1, $2, $3, $4, $5)', [req.body.name, req.user.email, req.body.price, req.body.discount, req.body.description]);
        if(productInserted.rowCount>=1) {
            res.json({type: "SUCCESS", msg: "Added new product"});
        } else {
            res.json({type: "ERROR"});
        }
    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
});


router.post("/removeProduct", async (req:nRequest, res:Response)=>{
    try {
        const productDeleted = await pool.query('DELETE FROM "product" WHERE addedBy = $1 AND productid = $2', [req.user.email, req.body.productID])
        if(productDeleted.rowCount>=1) {
            res.json({type: "SUCCESS", msg: "Deleted product"});
        } else {
            res.json({type: "ERROR"});
        }
    } catch (err) {
        res.json({type:"ERROR", msg: err});
    }
})
export default router;