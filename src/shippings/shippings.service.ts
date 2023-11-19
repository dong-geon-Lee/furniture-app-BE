import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShippingsService {
  constructor(
    @InjectRepository(Shipping)
    private repo: Repository<Shipping>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(body: CreateShippingDto) {
    const user = await this.userRepo.findOne({ where: { id: body.userId } });

    const shippings = this.repo.create({
      userName: body.userName,
      userEmail: body.userEmail,
      userPhone: body.userPhone,
      address: body.address,
      method: body.method,
      postcode: body.postcode,
      productPrice: body.productPrice,
      productShip: body.productShip,
      productTotal: body.productTotal,
      user,
    });

    return this.repo.save(shippings);
  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { user: { id } },
      relations: ['user'],
    });
  }

  update(id: number, body: UpdateShippingDto) {
    return `This action updates a #${id} shipping ${body}`;
  }

  async remove(id: number) {
    const shippings = await this.repo.findOne({ where: { id } });
    if (!shippings) throw new NotFoundException(`존재하지않는 id:${id}`);
    return this.repo.remove(shippings);
  }
}
