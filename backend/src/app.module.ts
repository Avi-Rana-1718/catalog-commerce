import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ProductModule, OrderModule, AdminModule],
})
export class AppModule {}