/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";



export default class UpdateCarByPropsDto {

    @IsString({ message: "Prop Name must be a string" })
    @IsNotEmpty({ message: "Prop Name is required" })
    propName: string;

    @IsString({ message: "Prop Value must be a string" })
    @IsNotEmpty({ message: "Prop Value is required" })
    propValue: string;

    @IsString({ message: "Car Id must be a string" })
    @IsOptional({})
    carId?: string;

    @IsString({ message: "License Plate must be a string" })
    @IsOptional({})
    licensePlate?: string;

    @IsNumber({}, { message: "Price must be a number" })
    @IsOptional({})
    statusCode?: number;

    @IsString({ message: "Status must be a string" })
    @IsOptional({})
    status?: string;

    @IsString({ message: "Parking Place must be a string" })
    @IsOptional({})
    parkingPlace?: string;
};