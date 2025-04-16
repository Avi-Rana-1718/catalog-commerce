import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken"

interface nRequest extends Request {
    user?: {}
}

export function auth(req: nRequest, res:Response, next:NextFunction) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(token==null) {
            res.json({type: "ERROR", msg: "Authenticate to access!"});
            return;
        }
        console.log(token);
        
        jwt.verify(token, process.env.SECERT, (err, user)=>{
        if(err) {
            res.json({type: "ERROR", msg: "Invalid token!"});
            return;
        }

        console.log("123", user);
        
        req.user = user;
        next();
        })
        
    } catch (err) {
        console.log({type: "ERROR", msg: err});
    }
}