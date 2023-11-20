import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(body: CreateOrderDto) {
    const user = await this.userRepo.findOne({ where: { id: body.userId } });
    const orders = this.repo.create({
      impUid: body.impUid,
      merchantUid: body.merchantUid,
      buyerAddr: body.buyerAddr,
      buyerEmail: body.buyerEmail,
      buyerName: body.buyerName,
      buyerTel: body.buyerTel,
      buyerPostcode: body.buyerPostcode,
      paidAmount: body.paidAmount,
      paidAt: body.paidAt,
      payMethod: body.payMethod,
      status: body.status,
      quantity: body.quantity,
      user,
    });

    return this.repo.save(orders);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return this.repo.find({
      where: { user: { id } },
      relations: ['user'],
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
