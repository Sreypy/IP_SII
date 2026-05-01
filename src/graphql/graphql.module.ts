// import { Module } from '@nestjs/common';
// import { CategoryResolver } from './resolvers/category.resolver';
// import { ProductResolver } from './resolvers/product.resolver';

// // ✅ import your existing modules/services
// import { CategoryModule } from '../category/category.module';
// import { ProductModule } from '../product/product.module';

// @Module({
//   imports: [CategoryModule, ProductModule],
//   providers: [CategoryResolver, ProductResolver],
// })
// export class GraphqlModule {}

import { ProductModule } from 'src/product/product.module';
import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';
import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: [
    CategoryCodeFirstResolver,
    ProductCodeFirstResolver,
  ],
})
export class GraphqlModule {}