/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class FilterFeeDataDto {
    @IsMongoId({ message: "Reservation Id must be a valid id" })
    @IsNotEmpty({ message: "Reservation Id is required" })
    reservationId?: string;

    @IsString({ message: "Reservation Type must be a string" })
    @IsOptional({})
    reservationType?: string;

    @IsString({ message: "Reservation Type Name must be a string" })
    @IsOptional({})
    reservationTypeName?: string;
};