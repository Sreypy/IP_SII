import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateProductInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field(() => ID)
  @Type(() => Number)   // ⭐ converts string → number
  @IsNumber()
  categoryId: number;
}