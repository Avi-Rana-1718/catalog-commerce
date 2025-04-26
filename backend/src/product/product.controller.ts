import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController{
    constructor(private productService:ProductService){}

    @Get("all")
    getAll() {
        return this.productService.getAll()
    }

    @Get("search")
    getByName(@Query("name") name:string) {  
        return this.productService.getByName(name)
    }

    @Post("search")
    getByCategory(@Body() body) {
        return this.productService.getByCategory(body.categories)
    }

    @Get(":id")
    getById(@Param("id") productID:string) {
        return this.productService.getById(productID);
    }


}