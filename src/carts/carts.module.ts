import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { UsersService } from 'src/users/users.service';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product])],
  controllers: [CartsController],
  providers: [CartsService, UsersService, ProductsService],
})
export class CartsModule {}
