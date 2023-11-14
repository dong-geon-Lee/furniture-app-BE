import { Expose } from 'class-transformer';

export class ProductDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  imageURL: string;

  @Expose()
  category: string;
}
