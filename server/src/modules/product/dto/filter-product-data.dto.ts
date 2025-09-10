/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsMongoId, IsOptional, IsString, } from "class-validator";



export default class FilterProductDataDto {
    @IsMongoId({ message: 'Invalid product id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    productId?: string;

    @IsString({ message: 'Product name must be a string' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    productName?: string;

    @IsMongoId({ message: 'Invalid category id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    categoryId?: string;
};