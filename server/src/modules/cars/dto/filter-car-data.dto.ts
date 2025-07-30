/* eslint-disable prettier/prettier */
import { IsMongoId, IsOptional, IsString, } from "class-validator";



export default class FilterCarDataDto {
    @IsMongoId({ message: 'Invalid car id' })
    @IsOptional({})
    carId?: string;

    @IsString({ message: 'License Plate must be a string' })
    @IsOptional({})
    licensePlate?: string;

    @IsString({ message: 'Status Code must be a string' })
    @IsOptional({})
    statusCode?: number;

    @IsMongoId({ message: 'Parking Place Id must be a string' })
    @IsOptional({})
    parkingPlace?: string;
};