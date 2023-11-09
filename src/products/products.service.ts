import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(
    name: string,
    description: string,
    price: string,
    imageURL: string,
    category: string,
  ) {
    const product = this.repo.create({
      name,
      description,
      price,
      imageURL,
      category,
    });

    return this.repo.save(product);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, body: any) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('제품을 찾을 수 없습니다');
    Object.assign(product, body);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException(`존재하지않는 id:${id}`);
    return this.repo.remove(product);
  }
}
