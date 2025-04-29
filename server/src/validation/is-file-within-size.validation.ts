/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


export default function IsBase64FileMaxSize(maxSizeInBytes: number, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isBase64FileMaxSize',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [maxSizeInBytes],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [maxSize] = args.constraints;
                    if (typeof value !== 'string') {
                        return false;
                    }
                    const base64Length = value.length - (value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0);
                    const sizeInBytes = (base64Length * 3) / 4;
                    return sizeInBytes <= maxSize;
                },
                defaultMessage(args: ValidationArguments) {
                    const [maxSize] = args.constraints;
                    return `File size must not exceed ${maxSize} bytes`;
                },
            },
        });
    };
};