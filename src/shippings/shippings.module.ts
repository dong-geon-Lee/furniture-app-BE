import { Module } from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { ShippingsController } from './shippings.controller';
import { Shipping } from './entities/shipping.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping, User])],
  controllers: [ShippingsController],
  providers: [ShippingsService, UsersService],
})
export class ShippingsModule {}
