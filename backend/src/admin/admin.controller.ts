import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "@nestjs/passport";
import { ProductDto } from "./dto";
import { Request } from "express";
import { nRequest } from "src/interfaces/request.interface";


// error handling
// stock less

@UseGuards(AuthGuard("jwt"))
@Controller("admin")
export class AdminController {
    constructor(private adminService:AdminService){}

    @Post("addProduct")
    addProduct(@Body() dto:ProductDto, @Req() req:nRequest) {
        return this.adminService.addProduct(dto, req.user?.email);
    }

    @Get("all")
    getProductsByEmail(@Req() req:nRequest) {
        return this.adminService.getProductsByEmail(req.user?.email);
    }

    @Get("orders")
    getOrders(@Req() req:nRequest) {
        return this.adminService.getOrders(req.user?.email)
    }

    @Get("stats")
    getStats(@Req() req:nRequest) {
        return this.adminService.orderStatistic(req.user?.email)
    }
    
    @Post("editProduct")
    editProduct(@Req() req:nRequest) {
        return this.adminService.editProduct(req.body, req.user?.email)
    }

    @Delete("deleteProduct")
    deleteProduct(@Req() req:nRequest, @Query("productID") productID:string) {
        return this.adminService.deleteProduct(req.user?.email, productID)
    }
}
