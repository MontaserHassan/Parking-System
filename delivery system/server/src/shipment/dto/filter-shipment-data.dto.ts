/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';



export default class FilterShipmentDataDto {
    @IsOptional()
    @IsString({ message: 'Shipment name must be a string' })
    shipmentName?: string;

    @IsOptional()
    @IsString({ message: 'Shipment number must be a string' })
    shipmentNumber?: string;

    @IsOptional()
    @IsString({ message: "Receiver name must be a string" })
    receiverName?: string;

    @IsOptional()
    @IsString({ message: 'Sender name must be a string' })
    senderName?: string;

    @IsOptional()
    @IsPhoneNumber('EG', { message: 'Invalid phone number format' })
    phoneNumber?: string;

    @IsOptional()
    @IsString({ message: 'Return location must be a string' })
    returnLocation?: string;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    address?: string;

    @IsOptional()
    @IsString({ message: "Delivery time must be a string" })
    deliveryTime?: string;
}
