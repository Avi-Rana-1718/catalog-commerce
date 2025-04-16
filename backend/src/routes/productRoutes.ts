import express, { Router, Request, Response } from "express";
import pool from "../database/db";

const router:Router = express.Router();

router.get("/all", async (req:Request, res:Response)=>{
    try {
        const products = await pool.query('SELECT name, productid, price, discount, images  FROM "product" LIMIT 10');
        res.json(products?.rows);
        
    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
});

router.get("/:id", async (req:Request, res:Response)=>{
    try {
        const product = await pool.query('SELECT name, productid, price, discount, images, description FROM "product" WHERE productid = $1', [req.params.id]);
        res.json(product?.rows)
    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
})

export default router;