import { Module, ValidationPipe } from '@nestjs/common';
import { UploadModule } from './uploads/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { APP_PIPE } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { ShippingsModule } from './shippings/shippings.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: false,
      }),
    }),
    UploadModule,
    UsersModule,
    ProductsModule,
    CartsModule,
    ShippingsModule,
    OrdersModule,
  ],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
