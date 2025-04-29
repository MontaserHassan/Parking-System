/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export default class UpdateParkingPlaceByPropsDto {

    @IsString({ message: "Prop Name must be a string" })
    @IsNotEmpty({ message: "Prop Name must be not empty" })
    propName: string;

    @IsString({ message: "Prop Value must be a string" })
    @IsNotEmpty({ message: "Prop Value must be not empty" })
    propValue: string;

    @IsString({ message: "Place Number must be a string" })
    @IsOptional({})
    placeNumber?: string;

    @IsNumber({}, { message: "Floor Number must be a number" })
    @IsOptional({})
    floorNumber?: number;

    @IsNumber({}, { message: "Status Code must be a number" })
    @IsOptional({})
    statusCode?: number;

    @IsString({ message: "Status must be a string" })
    @IsOptional({})
    status?: string;
};