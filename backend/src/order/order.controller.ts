import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthGuard } from "@nestjs/passport";
import { OrderDto } from "./dto";
import { nRequest } from "src/interfaces/request.interface";

@Controller("order")
export class OrderController {

    constructor(private orderService:OrderService){}

    @UseGuards(AuthGuard("jwt"))
    @Get("all")
    getOrdersByEmail(@Req() req:nRequest, @Query("page") page:number) {        
        return this.orderService.getOrdersByEmail(req.user?.email, page)
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    createOrder(@Body() dto: OrderDto, @Req() req:nRequest) {
        return this.orderService.createOrder(req.user?.email, dto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("cancel")
    cancelOrder(@Req() req:nRequest, @Query("orderID") orderID:string) {
        return this.orderService.cancelOrder(req.user?.email, orderID);
    }
}