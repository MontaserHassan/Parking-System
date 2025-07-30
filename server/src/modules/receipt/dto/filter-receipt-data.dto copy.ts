/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsMongoId, IsOptional, IsString } from "class-validator";



export default class FilterReceiptDataDto {
    @IsMongoId({ message: 'Invalid car id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    car?: string;

    @IsString({ message: 'Receipt Number ' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    receiptNumber?: string;

    @IsString({ message: 'Status Code must be a string' })
    @IsOptional({})
    statusCode?: number;
};