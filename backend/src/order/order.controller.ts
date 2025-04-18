import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { OrderService } from "./order.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("order")
export class OrderController {

    constructor(private orderService:OrderService){}

    @UseGuards(AuthGuard("jwt"))
    @Get("get")
    getOrdersByEmail(@Req() req:nRequest) {
        console.log(req.user);
        
        return this.orderService.getOrdersByEmail(req.user?.email)
    }

    @Post("create")
    createOrder() {
        
    }
}


interface nRequest extends Request {
    user?: {
        email:string
    }
}