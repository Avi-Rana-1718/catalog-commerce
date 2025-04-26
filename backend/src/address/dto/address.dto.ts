import { IsNotEmpty, IsString } from "class-validator";

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    location:string;

    @IsString()
    @IsNotEmpty()
    mobile:string
}