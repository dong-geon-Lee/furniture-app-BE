import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingsService {
  constructor(@InjectRepository(Shipping) private repo: Repository<Shipping>) {}

  create(body: CreateShippingDto) {
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
    });

    return this.repo.save(shippings);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} shipping`;
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return `This action updates a #${id} shipping`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipping`;
  }
}
