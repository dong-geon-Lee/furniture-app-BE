import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, User, Product, Order])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
