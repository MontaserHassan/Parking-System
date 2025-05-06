/* eslint-disable prettier/prettier */
import { Transform, } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";



export default class CreateDiscountDto {
    @IsString({ message: "Discount Code must be a string" })
    @IsNotEmpty({ message: "Discount Code is required" })
    @Transform(({ value }) => value.trim())
    discountCode: string;

    @IsString({ message: "Discount Percentage must be a string" })
    @IsNotEmpty({ message: "Discount Percentage is required" })
    @Transform(({ value }) => value.trim())
    discountPercentage: string;

    @IsString({ message: "Discount Description must be a string" })
    @IsNotEmpty({ message: "Discount Description is required" })
    discountDescription: string;

    @IsString({ message: "Expiry Date must be a string" })
    @IsOptional({})
    discountExpiry: string;

    @IsString({ message: "Expiry Date must be a string" })
    @IsNotEmpty({ message: "Expiry Date is required" })
    @Transform(({ value }) => value.trim())
    expiryDate: string;

    @IsString({ message: "Expiry Time must be a string" })
    @IsNotEmpty({ message: "Expiry Time is required" })
    @Transform(({ value }) => value.trim())
    expiryTime: string;

    @IsString({ message: "Day Shift must be a string" })
    @IsNotEmpty({ message: "Day Shift is required" })
    @Transform(({ value }) => value.trim())
    @IsEnum(["AM", "PM"])
    dayShift: string;

    @IsBoolean({ message: "Valid must be a boolean" })
    @IsOptional({})
    isValid: boolean;
};