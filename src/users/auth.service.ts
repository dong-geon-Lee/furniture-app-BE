import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(name: string, email: string, password: string) {
    const users = await this.usersService.findAll(email);
    if (users.length) throw new BadRequestException('이메일이 이미 존재합니다');

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    const user = await this.usersService.create(name, email, hashedPwd);
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.findAll(email);
    if (!user) throw new NotFoundException('해당 이메일이 존재하지않습니다.');

    const isPwdMatch = await bcrypt.compare(password, user.password);
    if (!isPwdMatch) throw new UnauthorizedException('잘못된 비밀번호입니다.');

    const payload = { sub: user.id, email: user.email };
    const assessToken = await this.jwtService.signAsync(payload);
    return assessToken;
  }
}
