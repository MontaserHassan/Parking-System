/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, } from "class-validator";



export default class UpdateDiscountDto {
    @IsMongoId({ message: 'Discount Id must be a string' })
    @IsNotEmpty({ message: 'Discount Id is required' })
    @Transform(({ value }) => value.trim())
    discountId: string;

    @IsString({ message: 'Discount Percentage must be a string' })
    @IsOptional({})
    discountPercentage: string;

    @IsString({ message: 'Discount Description must be a string' })
    @IsOptional({})
    discountDescription: string;

    @IsString({ message: 'Expiry Date must be a string' })
    @IsOptional({})
    expiryDate: string;

    @IsString({ message: 'Status Code must be a string' })
    @IsOptional({})
    statusCode?: number;

    @IsString({ message: 'Status must be a string' })
    @IsOptional({})
    status?: string;

    @IsBoolean({ message: 'Is Valid must be a boolean' })
    @IsOptional({})
    isValid: boolean;
};