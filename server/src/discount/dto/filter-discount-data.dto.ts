/* eslint-disable prettier/prettier */
import { IsMongoId, IsOptional, IsString, } from "class-validator";



export default class FilterDiscountDataDto {
    @IsMongoId({ message: 'Invalid discount id' })
    @IsOptional({})
    discountId?: string;

    @IsString({ message: 'Discount Code must be a string' })
    @IsOptional({})
    discountCode?: string;

    @IsString({ message: 'License Plate must be a string' })
    @IsOptional({})
    isValid?: string;

    @IsString({ message: 'Status Code must be a string' })
    @IsOptional({})
    statusCode?: number;
};