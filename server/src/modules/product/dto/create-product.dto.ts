/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';



export default class CreateProductDto {
        @IsString({ message: 'Product name must be a string' })
        @IsNotEmpty({ message: 'Product name is required' })
        @Transform(({ value }) => value.trim())
        productName: string;

        // @IsMongoId({ message: 'Invalid category id' })
        // @IsNotEmpty({ message: 'category is required' })
        // @Transform(({ value }) => value.trim())
        // categoryId: string;

        @IsString({ message: 'Description must be a string' })
        @IsNotEmpty({ message: 'Description is required' })
        @Transform(({ value }) => value.trim())
        description: string;

        @IsNumber({}, { message: 'Price must be a number' })
        @IsNotEmpty({ message: 'Price is required' })
        price: number;

        @IsString({ message: 'Currency must be a string' })
        @IsNotEmpty({ message: 'Currency is required' })
        @Transform(({ value }) => value.trim())
        currency: string;
};