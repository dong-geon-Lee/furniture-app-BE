import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(name: string, description: string, price: number, imageURL: string) {
    const product = this.repo.create({ name, description, price, imageURL });
    return this.repo.save(product);
  }

  findAll(name: string) {
    return this.repo.find({ where: { name } });
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }
}
