import express, { Request, Response, Router } from "express";
import pool from "../database/db";

const router:Router =  express.Router();

interface nRequest extends Request {
    user?: {email: String}
}

router.get("/get", async (req: nRequest, res:Response)=>{
    try {
        console.log(req.user);
        
        const user = await pool.query('SELECT email, createdat, username FROM "user" WHERE email = $1', [req.user.email]);

        if(user.rows.length>=1) {
            res.json({type: "SUCCESS", msg: user.rows[0]});
        } else {
            res.json({type: "ERROR", msg: "User not found"})
        }
    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
})

export default router;