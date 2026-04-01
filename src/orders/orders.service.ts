import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
  private orders: any[] = [];
  constructor(
    @Inject(forwardRef(() => NotificationsService))
    private readonly notifications: NotificationsService,
  ) {}

  createOrder(orderDto: any) {
    this.orders.push(orderDto);
    this.notifications.notify('order_created', {
      order: orderDto,
    });
    return { status: 'Order accepted', order: orderDto };
  }

  findAll() {
    return this.orders;
  }

}