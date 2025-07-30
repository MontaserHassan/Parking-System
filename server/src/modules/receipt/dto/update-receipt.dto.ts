/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";



export default class UpdateReceiptDto {
    @IsNumber({}, { message: 'Receipt Number must be a number' })
    @IsNotEmpty({ message: 'Receipt Number is required' })
    @Transform(({ value }) => value?.trim())
    receiptNumber: string;

    @IsMongoId({ message: 'Invalid car id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    car: string;

    @IsMongoId({ message: 'Invalid parking place id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    parkingPlace: string;

    @IsMongoId({ message: 'Invalid fees id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    fees: string;

    @IsMongoId({ message: 'Invalid discount id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    discount: string;

    @IsMongoId({ message: 'Invalid tax id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    tax: string;
};