/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';



@ValidatorConstraint({ name: 'IsNumberOrUnlimited', async: false })
export default class IsNumberOrUnlimitedConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        return typeof value === 'number' || value === 'unlimited';
    };

    defaultMessage(args: ValidationArguments) {
        return `The value of ${args.property} must be a number or "unlimited"`;
    };
};