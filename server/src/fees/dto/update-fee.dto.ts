/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';



export default class UpdateFeeDto {
    @IsMongoId({ message: "Reservation Id must be a valid id" })
    @IsNotEmpty({ message: "Reservation Id is required" })
    reservationId: string;

    @IsString({ message: "Reservation Type must be a string" })
    @IsOptional({})
    reservationType: string;

    @IsString({ message: "Reservation Type Name must be a string" })
    @IsOptional({})
    reservationTypeName: string;

    @IsNumber({}, { message: "Price must be a string" })
    @IsOptional({})
    price: number;

    @IsString({ message: "Currency must be a string" })
    @IsOptional({})
    currency: string;
};
