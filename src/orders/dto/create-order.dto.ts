import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  impUid: string;

  @IsString()
  merchantUid: string;

  @IsString()
  buyerAddr: string;

  @IsString()
  buyerEmail: string;

  @IsString()
  buyerName: string;

  @IsString()
  buyerTel: string;

  @IsString()
  buyerPostcode: string;

  @IsNumber()
  paidAmount: number;

  @IsNumber()
  paidAt: number;

  @IsString()
  payMethod: string;

  @IsString()
  status: string;

  @IsNotEmpty()
  userId: number;

  @IsNumber()
  quantity: number;
}
