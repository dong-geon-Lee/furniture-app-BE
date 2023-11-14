import { Expose, Type } from 'class-transformer';

class UserInCartDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

class ProductInCartDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  imageURL: string;
}

export class CartDto {
  @Expose()
  id: number;

  @Expose()
  quantity: number;

  @Expose()
  @Type(() => UserInCartDto)
  user: UserInCartDto;

  @Expose()
  @Type(() => ProductInCartDto)
  product: ProductInCartDto;
}
