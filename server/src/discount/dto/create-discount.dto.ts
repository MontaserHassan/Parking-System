/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export default class CreateDiscountDto {
    @IsNumber({}, { message: "Discount Percentage must be a number" })
    @IsNotEmpty({ message: "Discount Percentage is required" })
    discountPercentage: string;

    @IsString({ message: "Discount Description must be a string" })
    @IsNotEmpty({ message: "Discount Description is required" })
    discountDescription: string;

    @IsString({ message: "Expiry Date must be a string" })
    @IsOptional({})
    discountExpiryDate: string;

    @IsDate({ message: "Formatted Expiry Date must be a date" })
    @IsOptional({})
    formattedExpiryDate: Date;

    @IsString({ message: "Expiry Date must be a string in the format DD/MM/YYYY" })
    @IsNotEmpty({ message: "Expiry Date is required" })
    @Transform(({ value }) => value.trim())
    expiryDate: string;

    @IsString({ message: "Expiry Time must be a string in the format HH:mm" })
    @IsNotEmpty({ message: "Expiry Time is required" })
    @Transform(({ value }) => value.trim())
    expiryTime: string;

    @IsString({ message: "Day Shift must be a string" })
    @IsNotEmpty({ message: "Day Shift is required" })
    @Transform(({ value }) => value.trim())
    @IsEnum(["AM", "PM"], { message: "Day Shift must be 'AM' or 'PM'" })
    dayShift: string;

    @IsBoolean({ message: "Valid must be a boolean" })
    @IsOptional({})
    isValid: boolean;
};