import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  userId: number;

  @IsInt()
  quantity: number;
}
