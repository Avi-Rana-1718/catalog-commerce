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

    @IsNotEmpty()
    category: any

    @IsArray()
    @IsNotEmpty()
    images: String[];

    @IsString()
    @IsNotEmpty()
    description: String;

    @IsOptional()
    options?:any
}