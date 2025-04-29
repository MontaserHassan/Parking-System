/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";



export default class CreateCarDto {
    @IsString({ message: "License Plate must be a string" })
    @IsNotEmpty({ message: "License Plate is required" })
    @Transform(({ value }) => value?.toLowerCase().trim())
    licensePlate: string;

    @IsMongoId({ message: "Invalid Parking Place Id" })
    @IsNotEmpty({ message: "Parking Place is required" })
    @Transform(({ value }) => value?.toLowerCase().trim())
    parkingPlace: string;
};