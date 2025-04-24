import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: Number;

    @IsNotEmpty()
    @IsNumber()
    discount: Number;

    // @IsString()
    // @IsNotEmpty()
    // categories: any

    @IsArray()
    @IsNotEmpty()
    images: String[];

    @IsString()
    @IsNotEmpty()
    description: String;

    @IsOptional()
    options?:any
}