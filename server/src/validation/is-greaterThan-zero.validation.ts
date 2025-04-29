/* eslint-disable prettier/prettier */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';



@ValidatorConstraint({ name: 'isGreaterThanZero', async: false })
export default class IsGreaterThanZeroConstraint implements ValidatorConstraintInterface {

    validate(value: string | number): boolean {
        const numberValue = typeof value === 'string' ? parseInt(value, 10) : value;
        return numberValue > 0;
    };

    defaultMessage(args: ValidationArguments): string {
        const fieldName = args.constraints?.[0] || args.property;
        return `${fieldName} must be greater than 0`;
    };

};