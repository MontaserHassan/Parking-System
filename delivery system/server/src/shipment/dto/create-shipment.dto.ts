/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';




export default class CreateShipmentDto {
    @IsNotEmpty({ message: 'Shipment name is required' })
    @IsString({ message: 'Shipment name must be a string' })
    @Transform(({ value }) => value.trim())
    shipmentName: string;

    @IsNotEmpty({ message: 'Receiver name is required' })
    @IsString({ message: "Receiver name must be a string" })
    @Transform(({ value }) => value.trim())
    receiverName: string;

    @IsNotEmpty({ message: 'Sender name is required' })
    @IsString({ message: 'Sender name must be a string' })
    @Transform(({ value }) => value.trim())
    senderName: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @IsPhoneNumber('EG', { message: 'Invalid phone number format' })
    @Transform(({ value }) => value.trim())
    phoneNumber: string;

    @IsNotEmpty({ message: 'Return location is required' })
    @IsString({ message: 'Return location must be a string' })
    @Transform(({ value }) => value.trim())
    returnLocation: string;

    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address must be a string' })
    @Transform(({ value }) => value.trim())
    address: string;

    @IsOptional({})
    @IsString({ message: 'Delivery time must be a string' })
    @Transform(({ value }) => value.trim())
    deliveryTime?: string;

    @IsOptional({})
    @IsNumber({}, { message: 'Minium Delivery Time must be a number' })
    @Transform(({ value }) => value.trim())
    miniumDeliveryTime?: number;

    @IsOptional({})
    @IsNumber({}, { message: 'Maximum Delivery Time must be a number' })
    @Transform(({ value }) => value.trim())
    maximumDeliveryTime?: number;

    @IsOptional({})
    minDate: string;

    @IsOptional({})
    maxDate: string;
};