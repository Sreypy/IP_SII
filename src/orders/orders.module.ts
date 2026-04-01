import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    forwardRef(() => NotificationsModule), // ✅ if circular
  ],
  providers: [OrdersService],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}