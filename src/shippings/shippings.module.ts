import { Module } from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { ShippingsController } from './shippings.controller';
import { Shipping } from './entities/shipping.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping])],
  controllers: [ShippingsController],
  providers: [ShippingsService],
})
export class ShippingsModule {}
