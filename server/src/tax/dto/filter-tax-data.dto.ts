/* eslint-disable prettier/prettier */
import { IsMongoId, IsOptional, IsString, } from "class-validator";



export default class FilterTaxDataDto {
    @IsMongoId({ message: 'Invalid tax id' })
    @IsOptional({})
    taxId?: string;

    @IsString({ message: 'Tax Code must be a string' })
    @IsOptional({})
    taxCode?: string;

    @IsString({ message: 'Status Code must be a string' })
    @IsOptional({})
    statusCode?: number;
};