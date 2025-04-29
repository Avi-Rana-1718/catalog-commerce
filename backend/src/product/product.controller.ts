import { Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { FileInterceptor } from "@nestjs/platform-express"
import { AuthGuard } from "@nestjs/passport";

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

    @Get("category/:id")
    getByCategory(@Param("id") category:string) {
        return this.productService.getByCategory(category)
    }

    @Get(":id")
    getById(@Param("id") productID:string) {
        return this.productService.getById(productID);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("uploadImage")
    @UseInterceptors(FileInterceptor("file"))
    uploadFile(@UploadedFile() file:Express.Multer.File) {
        return {type:"SUCCESS", msg: "http://localhost:3030/uploads/" + file.filename}
    }


}