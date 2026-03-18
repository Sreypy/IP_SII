import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receipts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './database/entities/receipt.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ReceiptsModule,
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
  ReceiptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}