import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receipts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './database/entities/receipt.entity';
import * as dotenv from 'dotenv';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// 1. Import your new GraphQL and Feature modules
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { GraphqlModule } from './graphql/graphql.module'; // The module with your resolvers

dotenv.config();

@Module({
  imports: [
    // Database Configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sreypy',
      password: '12345',
      database: 'receipts_db',
      entities: [Receipt, Category, Product],
      synchronize: true, // Auto-creates tables for Category and Product
    }),

    // Feature Modules
    CategoryModule,
    ProductModule,
    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
    CoreModule,
    
    // 2. Import your GraphqlModule so Nest finds your Resolvers
    GraphqlModule,

    // GraphQL Configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],

        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),

      playground: false, 
      plugins: [ApolloServerPluginLandingPageLocalDefault()], 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}