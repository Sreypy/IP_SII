import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receipts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './database/entities/receipt.entity';
import * as dotenv from 'dotenv';
import { NotificationsModule} from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
dotenv.config();

@Module({
  imports: [
    ReceiptsModule,
    NotificationsModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'sreypy',
    password: '12345',
    database: 'receipts_db',
    entities: [Receipt],
    synchronize: true,
  }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}