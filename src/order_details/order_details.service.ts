import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private repo: Repository<OrderDetail>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  async create(body: CreateOrderDetailDto) {
    const { userId, cartItems, quantity, orderId } = body;
    console.log(userId, orderId);
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`유저 ID "${userId}"가 존재하지않습니다`);
    }

    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException(`주문 ID "${orderId}"가 존재하지 않습니다.`);
    }

    const orderDetail = this.repo.create({
      user,
      cartItems,
      quantity,
      order,
    });

    return this.repo.save(orderDetail);
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  async findOne(id: number) {
    const orderDetail = await this.repo.find({
      where: { order: { id } },
      relations: ['order'],
    });

    return orderDetail;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
