import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(body: CreateCartDto) {
    const { userId, productId, quantity } = body;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`유저 ID "${userId}"가 존재하지않습니다`);
    }

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`제품 ID "${productId}"가 존재하지않습니다`);
    }

    const cart = this.cartRepo.create({
      user,
      product,
      quantity,
    });

    return this.cartRepo.save(cart);
  }

  findAll() {
    return this.cartRepo.find({ relations: ['user', 'product'] });
  }

  findOne(id: number) {
    return this.cartRepo.find({
      where: { user: { id } },
      relations: ['user', 'product'],
    });
  }

  async update(id: number, body: number) {
    const cart = await this.cartRepo.findOne({
      where: { id },
      relations: ['user', 'product'],
    });

    if (!cart) throw new NotFoundException('존재하지않는 카트입니다');
    Object.assign(cart, body);
    return this.cartRepo.save(cart);
  }

  async remove(id: number) {
    return await this.cartRepo.delete(id);
  }
}
