/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export default class CreateFessDto {
    @IsString({ message: "Reservation Type must be a string" })
    @IsNotEmpty({ message: "Reservation Type is required" })
    @Transform(({ value }) => value?.toLowerCase().trim())
    reservationType: string;

    @IsString({ message: "Reservation Type Name must be a string" })
    @IsNotEmpty({ message: "Reservation Type Name is required" })
    @Transform(({ value }) => value?.toLowerCase().trim())
    reservationTypeName: string;

    @IsString({ message: "Description must be a string" })
    @IsNotEmpty({ message: "Description is required" })
    @Transform(({ value }) => value?.toLowerCase().trim())
    description: string;

    @IsNumber({}, { message: "Price must be a Number" })
    @IsNotEmpty({ message: "Price is required" })
    price: number;

    @IsString({ message: "Currency must be a string" })
    @IsNotEmpty({ message: "Currency is required" })
    @Transform(({ value }) => value?.trim())
    currency: string;
};