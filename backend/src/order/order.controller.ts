import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthGuard } from "@nestjs/passport";
import { OrderDto } from "./dto";
import { nRequest } from "src/interfaces/request.interface";

@UseGuards(AuthGuard("jwt"))
@Controller("order")
export class OrderController {

    constructor(private orderService:OrderService){}

    @Get("all")
    getOrdersByEmail(@Req() req:nRequest, @Query("page") page:number) {        
        return this.orderService.getOrdersByEmail(req.user?.email, page)
    }

    @Post("create")
    createOrder(@Body() dto: OrderDto, @Req() req:nRequest) {
        return this.orderService.createOrder(req.user?.email, dto);
    }

    @Delete("cancel")
    cancelOrder(@Req() req:nRequest, @Query("orderID") orderID:string) {
        return this.orderService.cancelOrder(req.user?.email, orderID);
    }
}