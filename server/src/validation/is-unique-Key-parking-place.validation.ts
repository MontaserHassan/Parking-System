/* eslint-disable prettier/prettier */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';



@ValidatorConstraint({ name: 'IsUniqueKeyParkingPlace', async: false })
export default class IsUniqueKeyParkingPlace implements ValidatorConstraintInterface {

    validate(array: any[], args: ValidationArguments) {
        const fieldName = args.constraints[0];
        const uniqueValues = new Set(array.map((item) => item[fieldName]));
        return uniqueValues.size === array.length;
    };

    defaultMessage(args: ValidationArguments) {
        const fieldName = args.constraints[0];
        return `${fieldName} must be unique within the array.`;
    };

};