// src/orders/orders.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

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