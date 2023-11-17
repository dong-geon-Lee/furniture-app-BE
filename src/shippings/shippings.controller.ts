import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Controller('shippings')
export class ShippingsController {
  constructor(private readonly shippingsService: ShippingsService) {}

  @Post()
  create(@Body() body: CreateShippingDto) {
    return this.shippingsService.create(body);
  }

  @Get()
  findAll() {
    return this.shippingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingsService.findOne(+id);
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
