/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";



export default class CreateReceiptDto {
    @IsMongoId({ message: 'Invalid car id' })
    @IsNotEmpty({ message: 'Car Id is required' })
    @Transform(({ value }) => value?.trim())
    car: string;

    @IsMongoId({ message: 'Invalid parking place id' })
    @IsNotEmpty({ message: 'Parking place Id is required' })
    @Transform(({ value }) => value?.trim())
    parkingPlace: string;

    @IsMongoId({ message: 'Invalid fees id' })
    @IsNotEmpty({ message: 'Fee Id is required' })
    @Transform(({ value }) => value?.trim())
    fees: string;

    @IsMongoId({ message: 'Invalid discount id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    discount?: string;

    @IsMongoId({ message: 'Invalid tax id' })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    tax?: string;

    @IsNumber({}, { message: 'Total Fees must be a number' })
    @IsNotEmpty({ message: 'Total Fees is required' })
    totalFees: number;
};