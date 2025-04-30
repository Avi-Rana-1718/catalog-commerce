import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AuthGuard } from "@nestjs/passport";
import { nRequest } from "src/interfaces/request.interface";
import { AddressDto } from "./dto";

@UseGuards(AuthGuard("jwt"))
@Controller("address")
export class AddressController{
    constructor(private addressService:AddressService){}

    @Get("all")
    getAddressesByEmail(@Req() req:nRequest) {
        return this.addressService.getAddressByEmail(req.user?.email)
    }

    @Post("create")
    createAddress(@Req() req:nRequest, @Body() dto:AddressDto) {
        return this.addressService.createAddress(req.user?.email, dto);
    }

    @Delete("delete")
    deleteAddress(@Req() req:nRequest, @Query("addressID") addressID:string) {
        return this.addressService.deleteAddress(req.user?.email, addressID);
    }
}