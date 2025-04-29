import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { AuthGuard } from "@nestjs/passport";
import { CouponDto } from "./dto/coupon.dto";
import { nRequest } from "src/interfaces/request.interface";

@Controller("coupon")
export class CouponController {
    constructor(private couponService:CouponService){}

    @UseGuards(AuthGuard("jwt"))
    @Get("all")
    getCouponsByEmail(@Req() req:nRequest) {
        return this.couponService.getCouponsByEmail(req.user?.email)
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    createCoupon(@Req() req:nRequest, @Body() dto:CouponDto) {
        return this.couponService.createCoupon(req.user?.email, dto)
    }

    @Get("valid")
    validCoupon(@Query("code") code:string) {
        return this.couponService.isCouponValid(code);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("delete")
    deleteCoupon(@Req() req:nRequest, @Query("code") code:string) {
        return this.couponService.deleteCoupon(req.user?.email, code);
    }

    @Get("redeem")
    redeemCoupon(@Query("code") code:string) {
        return this.couponService.redeemCoupon(code)
    }
}