/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export default class UpdateTaxDto {
    @IsString({ message: "Tax Id must be a string" })
    @IsNotEmpty({ message: "Tax Id is required" })
    taxId: string;

    @IsNumber({}, { message: "Tax Code must be a number" })
    @IsOptional({ message: "Tax Code is required" })
    taxPercentage: string;

    @IsString({ message: "Tax Description must be a string" })
    @IsOptional({ message: "Tax Description is required" })
    taxDescription: string;
};