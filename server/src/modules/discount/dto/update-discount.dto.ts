/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";



export default class UpdateDiscountDto {
    @IsMongoId({ message: 'Discount Id must be a string' })
    @IsNotEmpty({ message: 'Discount Id is required' })
    @Transform(({ value }) => value.trim())
    discountId: string;

    @IsNumber({}, { message: 'Discount Percentage must be a number' })
    @IsOptional({})
    discountPercentage: string;

    @IsString({ message: 'Discount Description must be a string' })
    @IsOptional({})
    discountDescription: string;

    @IsString({ message: "Expiry Date must be a string" })
    @IsOptional({})
    discountExpiryDate: string;

    @IsDate({ message: "Formatted Expiry Date must be a date" })
    @IsOptional({})
    formattedExpiryDate: Date;

    @IsString({ message: "Expiry Date must be a string in the format DD/MM/YYYY" })
    @IsOptional({})
    @Transform(({ value }) => value.trim())
    expiryDate: string;

    @IsString({ message: "Expiry Time must be a string in the format HH:mm" })
    @IsOptional({})
    @Transform(({ value }) => value.trim())
    expiryTime: string;

    @IsString({ message: "Day Shift must be a string" })
    @IsOptional({})
    @Transform(({ value }) => value.trim())
    @IsEnum(["AM", "PM"], { message: "Day Shift must be 'AM' or 'PM'" })
    dayShift: string;

    @IsString({ message: 'Status Code must be a string' })
    @IsOptional({})
    statusCode?: number;

    @IsString({ message: 'Status must be a string' })
    @IsOptional({})
    status?: string;

    @IsBoolean({ message: 'Is Valid must be a boolean' })
    @IsOptional({})
    isValid: boolean;
};