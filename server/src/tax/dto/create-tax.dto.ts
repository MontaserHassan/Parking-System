/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export default class CreateTaxDto {
    @IsNumber({}, { message: "Tax Percentage must be a number" })
    @IsNotEmpty({ message: "Tax Percentage is required" })
    taxPercentage: string;

    @IsString({ message: "Tax Description must be a string" })
    @IsNotEmpty({ message: "Tax Description is required" })
    taxDescription: string;
};