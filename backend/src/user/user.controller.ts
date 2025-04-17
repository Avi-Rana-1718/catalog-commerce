import { Controller, Get, Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController{
    constructor(private userService:UserService){}

    @Get("/get")
    getUser() {
        return this.userService.getUser()
    }
}