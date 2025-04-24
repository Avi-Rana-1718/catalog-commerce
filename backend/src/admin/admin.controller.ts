import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "@nestjs/passport";
import { ProductDto } from "./dto";
import { Request } from "express";

@Controller("admin")
export class AdminController {
    constructor(private adminService:AdminService){}

    @UseGuards(AuthGuard("jwt"))
    @Post("addProduct")
    addProduct(@Body() dto:ProductDto, @Req() req:nRequest) {
        return this.adminService.addProduct(dto, req.user?.email);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("all")
    getProductsByEmail(@Req() req:nRequest) {
        return this.adminService.getProductsByEmail(req.user?.email);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("orders")
    getOrders(@Req() req:nRequest) {
        return this.adminService.getOrders(req.user?.email)
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("stats")
    getStats(@Req() req:nRequest) {
        return this.adminService.orderStatistic(req.user?.email)
    }
    
    @UseGuards(AuthGuard("jwt"))
    @Post("editProduct")
    editProduct(@Req() req:nRequest) {
        return this.adminService.editProduct(req.body, req.user?.email)
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("deleteProduct")
    deleteProduct(@Req() req:nRequest, @Query("productID") productID:string) {
        return this.adminService.deleteProduct(req.user?.email, productID)
    }
}

interface nRequest extends Request {
    user?: {
        email:string
    }
}