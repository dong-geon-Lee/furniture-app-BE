import { IsNumber, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsString()
  userName: string;

  @IsString()
  userEmail: string;

  @IsString()
  userPhone: string;

  @IsString()
  address: string;

  @IsNumber()
  postcode: number;

  @IsString()
  method: string;

  @IsNumber()
  productPrice: number;

  @IsNumber()
  productShip: number;

  @IsNumber()
  productTotal: number;
}
