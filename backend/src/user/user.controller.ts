import { Body, Controller, Delete, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@UseGuards(AuthGuard("jwt"))
@Controller("user")
export class UserController{
    constructor(private userService:UserService){}

    @Get("get")
    getUser(@Req() req:Request) {
        return this.userService.getUser(req.user)
    }

    @Delete("delete")
    deleteUser(@Req() req:Request) {
        return this.userService.deleteUser(req.user)
    }

    @Post("edit")
    editUser(@Req() req:Request, @Body() body:{username:string}) {
        return this.userService.editUsername(body.username, req.user)
    }
}