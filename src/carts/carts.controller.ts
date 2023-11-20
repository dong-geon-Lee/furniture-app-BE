import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CartDto } from './dto/cart.dto';
import { JwtAuthGuard, RolesGuard } from 'src/guards/auth.guard';

@Controller('carts')
@Serialize(CartDto)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  find(@Request() req) {
    return this.cartsService.findOne(req.user.userId);
  }

  @Post()
  create(@Body() body: CreateCartDto) {
    return this.cartsService.create(body);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.cartsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }

  @Delete('me/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  removeAll(@Param('id') id: string) {
    return this.cartsService.removeAll(+id);
  }
}
