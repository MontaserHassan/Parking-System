/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, Validate, ValidateNested } from "class-validator";

import IsUniqueKeysParkingPlace from "src/validation/is-unique-Keys-parking-place.validation";


class ParkingPlace {
    @IsString({ message: "Place Number must be a string" })
    @IsNotEmpty({ message: "Place Number is required" })
    placeNumber: string;

    @IsNumber({}, { message: "Floor Number must be a number" })
    @IsNotEmpty({ message: "Floor Number is required" })
    floorNumber: number;
};


export default class CreateParkingPlaceDto {
    @IsArray({ message: "New Parking Places must be an array" })
    @ArrayNotEmpty({ message: 'New Parking Places cannot be empty' })
    @ArrayMinSize(1, { message: 'New Parking Places must be an array and have at least 1 item' })
    @ValidateNested({ each: true, })
    @Type(() => ParkingPlace)
    @Validate(IsUniqueKeysParkingPlace, ['placeNumber', 'floorNumber'],)
    newParkingPlaces: ParkingPlace[];
};