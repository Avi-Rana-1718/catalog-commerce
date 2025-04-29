import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { CouponModule } from "src/coupon/coupon.module";

@Module({
    imports: [CouponModule],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}