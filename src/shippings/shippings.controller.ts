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
import { ShippingsService } from './shippings.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { JwtAuthGuard, RolesGuard } from 'src/guards/auth.guard';

@Controller('shippings')
export class ShippingsController {
  constructor(private readonly shippingsService: ShippingsService) {}

  @Post()
  create(@Body() body: CreateShippingDto) {
    return this.shippingsService.create(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  find(@Request() req) {
    return this.shippingsService.findOne(req.user.userId);
  }

  @Get()
  findAll() {
    return this.shippingsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateShippingDto) {
    return this.shippingsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingsService.remove(+id);
  }
}
