import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';
import { CouponModule } from './coupon/coupon.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ProductModule, OrderModule, AdminModule, CouponModule, AddressModule],
})
export class AppModule {}