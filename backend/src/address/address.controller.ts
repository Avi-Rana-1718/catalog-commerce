import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AuthGuard } from "@nestjs/passport";
import { nRequest } from "src/interfaces/request.interface";
import { AddressDto } from "./dto";

@Controller("address")
export class AddressController{
    constructor(private addressService:AddressService){}

    @UseGuards(AuthGuard("jwt"))
    @Get("all")
    getAddressesByEmail(@Req() req:nRequest) {
        return this.addressService.getAddressByEmail(req.user?.email)
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    createAddress(@Req() req:nRequest, @Body() dto:AddressDto) {
        return this.addressService.createAddress(req.user?.email, dto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("delete")
    deleteAddress(@Req() req:nRequest, @Query("addressID") addressID:string) {
        return this.addressService.deleteAddress(req.user?.email, addressID);
    }
}