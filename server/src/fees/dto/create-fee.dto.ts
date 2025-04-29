/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";




export default class CreateFessDto {
    @IsString({ message: "Reservation Type must be a string" })
    @IsNotEmpty({ message: "Reservation Type is required" })
    reservationType: string;

    @IsString({ message: "Reservation Type Name must be a string" })
    @IsNotEmpty({ message: "Reservation Type Name is required" })
    reservationTypeName: string;

    @IsNumber({}, { message: "Price must be a Number" })
    @IsNotEmpty({ message: "Price is required" })
    price: number;

    @IsString({ message: "Currency must be a string" })
    @IsNotEmpty({ message: "Currency is required" })
    currency: string;
};