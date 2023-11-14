import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(name: string, email: string, password: string) {
    const user = this.repo.create({ name, email, password });
    return this.repo.save(user);
  }

  findAll(email: string) {
    return this.repo.find({ where: { email } });
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('유저가 존재하지않습니다.');

    if (body.password) {
      const salt = await bcrypt.genSalt();
      const hashedPwd = await bcrypt.hash(body.password, salt);
      body.password = hashedPwd;
    }

    Object.assign(user, body);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('유저가 존재하지않습니다');
    return this.repo.remove(user);
  }
}
