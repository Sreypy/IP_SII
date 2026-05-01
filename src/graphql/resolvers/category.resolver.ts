// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// // import { CategoryService } from '../../category/category.service';
// import { CategoryService } from '../../category/category.service';

// @Resolver('Category') // <-- matches schema type name
// export class CategoryResolver {
//   constructor(private readonly categoryService: CategoryService) {}

// //   @Query('categories') // <-- matches schema query name
// //   categories() {
// //     return this.categoryService.findAll(); // you already have (or students implement)
// //   }

// @Query('categories')
// async categories() {
//   return await this.categoryService.findAll();
// }

//   @Mutation('createCategory')
//   createCategory(@Args('name') name: string) {
//     return this.categoryService.create({ name });
//   }
// }

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type'; // 👈 Import the type you created in B2
import { CategoryService } from '../../category/category.service';

@Resolver(() => CategoryType) // 👈 Add return type here
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryType]) // 👈 This tells Nest: "This returns an array of CategoryType"
  categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryType) // 👈 This returns a single CategoryType
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}