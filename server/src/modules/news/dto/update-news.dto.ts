/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";



export default class UpdateNewsDto {
    @IsString({ message: 'News Id must be a string' })
    @IsNotEmpty({ message: 'News Id must not be empty' })
    newsId: string;

    @IsString({ message: 'Title must be a string' })
    @IsOptional({})
    title?: string;

    @IsString({ message: 'News Data must be a string' })
    @IsOptional({})
    newsData?: string;

    @IsString({ message: 'Media must be a string' })
    @IsOptional({})
    media?: string;

    @IsBoolean({ message: 'Special must be a boolean' })
    @IsOptional({})
    special?: boolean
};