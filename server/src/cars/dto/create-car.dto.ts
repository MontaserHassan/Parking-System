/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";



export default class CreateCarDto {
    @IsString({ message: "License Plate must be a string" })
    @IsNotEmpty({ message: "License Plate is required" })
    @Transform(({ value }) => value?.toLowerCase().trim())
    licensePlate: string;

    @IsMongoId({ message: "Invalid Parking Place Id" })
    @IsNotEmpty({ message: "Parking Place is required" })
    @Transform(({ value }) => value?.toLowerCase().trim())
    parkingPlace: string;

    @IsMongoId({ message: 'Invalid fees id' })
    @IsNotEmpty({ message: 'Fee Id is required' })
    @Transform(({ value }) => value?.trim())
    fees: string;

    @IsString({ message: "Discount must be a string" })
    @IsOptional({})
    @Transform(({ value }) => value?.trim())
    discount: string;
};