import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("user")
export class UserController{
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard("jwt"))
    @Get("/get")
    getUser(@Req() req:Request) {
        return this.userService.getUser(req.user)
    }
}