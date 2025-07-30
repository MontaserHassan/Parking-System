/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";



export default class CreateNewsDto {
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: 'Title must not be empty' })
    title: string;

    @IsString({ message: 'News Data must be a string' })
    @IsNotEmpty({ message: 'News Data must not be empty' })
    @Transform(({ value }) => value.trim())
    newsData: string;

    @IsString({ message: 'Media must be a string' })
    @IsOptional({})
    media?: string;

    @IsBoolean({ message: 'Special must be a boolean' })
    @ValidateIf((o) => o.special !== undefined || null)
    @IsOptional({})
    special?: boolean;
};