import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard, RolesGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto) {
    const user = await this.authService.signIn(body.email, body.password);
    return user;
  }

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.name, body.email, body.password);
  }

  @Get()
  findAll(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  find(@Request() req) {
    return this.usersService.findOne(req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
