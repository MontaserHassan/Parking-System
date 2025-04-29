/* eslint-disable prettier/prettier */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';



@ValidatorConstraint({ name: 'IsUniqueKeysParkingPlace', async: false })
export default class IsUniqueKeysParkingPlace implements ValidatorConstraintInterface {

    validate(array: any[], args: ValidationArguments) {
        const fields: string[] = args.constraints;
        const seen = new Set();
        for (const item of array) {
            const compositeKey = fields.map(field => item[field]).join('|');
            if (seen.has(compositeKey)) return false;
            seen.add(compositeKey);
        };
        return true;
    };

    defaultMessage(args: ValidationArguments) {
        const fields = args.constraints;
        return `${fields.join(' and ')} must be unique together within the array.`;
    };

};