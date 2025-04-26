import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CouponDto {
    @IsString()
    @IsNotEmpty()
    coupon:string;

    @IsNumber()
    @IsNotEmpty()
    maxUses: number;

    @IsNotEmpty()
    expiresAt:string;

    @IsNotEmpty()
    @IsNumber()
    discount:number;
}