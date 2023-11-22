import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  cartItems: any[];

  @IsNumber()
  quantity: number;

  @IsNumber()
  orderId: number;
}
