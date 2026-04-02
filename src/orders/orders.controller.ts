import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@UseGuards(ApiKeyGuard) // add guards if needed, e.g., AuthGuard
@Controller('orders') // base route
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() orderDto: any) {
    return this.ordersService.createOrder(orderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

}