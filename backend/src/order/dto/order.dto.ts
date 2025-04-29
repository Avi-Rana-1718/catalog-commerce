import { IsNotEmpty, IsString } from "class-validator";

export class OrderDto {
    @IsNotEmpty()
    items:any;

    @IsString()
    coupon:string;

    @IsNotEmpty()
    address: {
        name: string,
        address: string,
        mobile: string
    };
};