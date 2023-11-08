import { IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsUrl()
  imageURL: string;

  @IsString()
  category: string;
}
