/* eslint-disable prettier/prettier */
import { IsMongoId, IsNumber, IsOptional, IsString, } from "class-validator";



export default class FilterParkingPlaceDataDto {
    @IsMongoId({ message: "Parking Place Id must be a valid id" })
    @IsOptional({})
    parkingPlaceId?: string;

    @IsString({ message: "Place Number must be a string" })
    @IsOptional({})
    placeNumber?: string;

    @IsNumber({}, { message: "Floor Number must be a number" })
    @IsOptional({})
    floorNumber?: number;

    @IsNumber({}, { message: "status must be a number" })
    @IsOptional({})
    statusCode?: number;

    @IsMongoId({ message: "car must be a string" })
    @IsOptional({})
    car?: string;

};