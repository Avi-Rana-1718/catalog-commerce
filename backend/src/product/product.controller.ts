import { Body, Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController{
    constructor(private productService:ProductService){}

    @Get("/all")
    getAll() {
        return this.productService.getAll()
    }

    @Get("/:id")
    getById(@Param("id") productID:string) {
        return this.productService.getById(productID);
    }
}