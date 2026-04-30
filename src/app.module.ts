import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receipts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './database/entities/receipt.entity';
import * as dotenv from 'dotenv';
import { NotificationsModule} from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlModule } from './graphql/graphql.module';

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
    CoreModule,

  // ✅ ADD GRAPHQL HERE
  GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // 👉 START with schema-first
      typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],

      playground: true,
    }),

    // ✅ your GraphQL resolvers module
    GraphqlModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}