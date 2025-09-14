/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNumber, } from 'class-validator';



export default class UpdateProductDto {
    @IsString({ message: 'Product name must be a string' })
    @IsOptional({ message: 'Product name is required' })
    productName: string;

    // @IsMongoId({ message: 'Invalid category id' })
    // @IsOptional({ message: 'category is required' })
    // categoryId: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional({ message: 'Description is required' })
    description: string;

    @IsNumber({}, { message: 'Price must be a number' })
    @IsOptional({ message: 'Price is required' })
    price: number;

    @IsString({ message: 'Currency must be a string' })
    @IsOptional({ message: 'Currency is required' })
    currency: string;
};
