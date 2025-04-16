import express, { Router, Request, Response } from "express";
import pool from "../database/db";
import jwt from "jsonwebtoken"

const router:Router = express.Router();

router.post("/create", async (req:Request, res:Response)=>{
    try {
        const userExists = await pool.query('SELECT * FROM "user" WHERE email = $1', [req.body.email]);

        if(userExists.rows.length>0) {
            res.json({type: "ERROR", msg: "User with these credentials already exists!"})
        } else {
            const userInserted = await pool.query('INSERT INTO "user" (email, password, username) VALUES ($1, $2, $3)', [req.body.email, req.body.password, req.body.username]);
            if(userInserted.rowCount>=1) {
                res.json({type: "SUCCESS", msg: "Created new user"});
            } else {
                res.json({type: "ERROR"}) 
            }
        }

    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
});

router.post("/login", async (req:Request, res:Response)=>{
    try {
        const userExists = await pool.query('SELECT * FROM "user" WHERE email = $1 AND password = $2', [req.body.email, req.body.password]);

        if(userExists.rows.length>0) {
            const userObj = {
                email: req.body.email
            }
            const token = jwt.sign(userObj, process.env.SECERT)
            res.json({type: "SUCCESS", msg: token})
        } else {
            res.json({type: "ERROR", msg: "User with these credentials does not exist!"})
        }

    } catch (err) {
        res.json({type: "ERROR", msg: err})
    }
})

export default router;