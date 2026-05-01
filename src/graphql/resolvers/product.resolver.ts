// import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
// import { ProductService } from '../../product/product.service';
// import { CategoryService } from '../../category/category.service';

// @Resolver('Product')
// export class ProductResolver {
//   constructor(
//     private readonly productService: ProductService,
//     private readonly categoryService: CategoryService,
//   ) {}

// //   @Query('products')
// //   products() {
// //     return this.productService.findAll();
// //   }

//     @Query('products')
//     async products() { // Add async
//     return await this.productService.findAll(); // Ensure 'return' and 'await' are here
//     }

//   @Query('product')
//   product(@Args('id') id: string) {
//     // GraphQL ID comes as string; convert if needed
//     return this.productService.findOne(Number(id));
//   }

//   @Mutation('createProduct')
//   createProduct(
//     @Args('name') name: string,
//     @Args('price') price: number,
//     @Args('categoryId') categoryId: string,
//   ) {
//     return this.productService.create({
//       name,
//       price,
//       categoryId: Number(categoryId),
//     });
//   }

//   // ✅ relation: Product.category
//   @ResolveField('category')
//   category(@Parent() product: any) {
//     return this.categoryService.findOne(product.categoryId);
//   }
// }

import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductType } from '../types/product.type'; // 👈 Import your ProductType
import { CategoryType } from '../types/category.type';
import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [ProductType]) // 👈 Explicitly return array of products
  products() {
    return this.productService.findAll();
  }

  @Query(() => ProductType, { nullable: true }) // 👈 Explicitly return one product
  product(@Args('id') id: number) {
    return this.productService.findOne(id);
  }

  // ... createProduct Mutation remains similar but use @Args('input') if using InputType
}