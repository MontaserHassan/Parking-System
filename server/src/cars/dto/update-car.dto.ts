/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsOptional, IsString, } from "class-validator";



export default class UpdateCarDto {

    @IsString({ message: 'Car Id must be a string' })
    @IsNotEmpty({ message: 'Car Id is required' })
    carId: string;

    @IsString({ message: 'License Plate must be a string' })
    @IsOptional({})
    @Transform(({ value }) => value?.toLowerCase().trim())
    licensePlate: string;

    @IsString({ message: 'Status Code must be a string' })
    @IsOptional({})
    statusCode: number;

    @IsString({ message: 'Status must be a string' })
    @IsOptional({})
    status: string;

    @IsMongoId({ message: 'Parking Place Id must be a string' })
    @IsOptional({})
    parkingPlace: string;
};