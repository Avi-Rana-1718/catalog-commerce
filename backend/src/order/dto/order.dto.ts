import { IsNotEmpty } from "class-validator";

export class OrderDto {
    @IsNotEmpty()
    items:any

    @IsNotEmpty()
    address: {
        name: string,
        address: string,
        mobile: string
    };
};