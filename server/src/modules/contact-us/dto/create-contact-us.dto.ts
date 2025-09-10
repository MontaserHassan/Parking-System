/* eslint-disable prettier/prettier */
import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";



export default class CreateContactUsDto {
    @IsString({ message: "Message Id must be a string" })
    @IsOptional({})
    messageId?: string;

    @IsString({ message: 'Full Name must be a string' })
    @IsNotEmpty({ message: 'Full Name is required' })
    @Matches(/^[\u0600-\u06FFa-zA-Z\s]{2,20}$/, { message: 'Full Name must contain letters and min characters is 2, max characters is 20' })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
    userName: string;

    @IsEmail({}, { message: "Email must be a valid email" })
    @IsNotEmpty({ message: "Email is required" })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
    email: string;

    @IsString({ message: "Phone Number must be a string" })
    @IsNotEmpty({ message: "Phone Number is required" })
    @Matches(/^\+[\d]{10,15}$/, { message: "Phone Number must start with '+' and contain 10 to 15 digits" })
    phoneNumber: string;

    @IsString({ message: "Content must be a string" })
    @IsNotEmpty({ message: "Content is required" })
    @MaxLength(500, { message: "Content must be no more than 500 characters long" })
    content: string;
};