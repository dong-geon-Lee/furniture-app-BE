import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateShippingDto } from './create-shipping.dto';

export class UpdateShippingDto extends PartialType(CreateShippingDto) {
  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsNumber()
  postcode: number;

  @IsString()
  @IsOptional()
  method: string;

  @IsString()
  category: string;

  @IsString()
  userName: string;

  @IsString()
  userEmail: string;

  @IsNumber()
  @IsOptional()
  productPrice: number;

  @IsNumber()
  @IsOptional()
  productShip: number;

  @IsNumber()
  @IsOptional()
  productTotal: number;
}
