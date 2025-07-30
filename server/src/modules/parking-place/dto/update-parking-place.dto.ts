/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import IsGreaterThanZeroConstraint from "src/validation/is-greaterThan-zero.validation";



export default class UpdateParkingPlaceDto {
    @IsMongoId({ message: "Place Number Id must be a string" })
    @IsNotEmpty({ message: "Place Number Id is required" })
    placeNumberId: string;

    @IsString({ message: "Place Number must be a string" })
    @IsOptional({})
    @IsNotEmpty({ message: "Place Number must not be empty" })
    placeNumber?: string;

    @IsNumber({}, { message: "Floor Number must be a number" })
    @IsOptional({})
    @Validate(IsGreaterThanZeroConstraint, ['Floor Number'])
    floorNumber?: number;

    @IsNumber({}, { message: "Status Code must be a number" })
    @IsOptional({})
    @Validate(IsGreaterThanZeroConstraint, ['Status Code'])
    statusCode?: number;
};