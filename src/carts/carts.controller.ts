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
  // Res,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CartDto } from './dto/cart.dto';
import { JwtAuthGuard, RolesGuard } from 'src/guards/auth.guard';
// import { Response } from 'express';

@Controller('carts')
@Serialize(CartDto)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  find(@Request() req) {
    return this.cartsService.findOne(req.user.userId);
  }

  // @Post('getToken')
  // async getToken(@Res() res: Response) {
  //   try {
  //     const token = await this.cartsService.getToken();
  //     return res.json(token);
  //   } catch (error) {
  //     return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  //   }
  // }

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
}
