/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { ParkingPlace } from 'src/modules/parking-place/database/parking-place.database';
import { Car } from 'src/modules/cars/database/car.database';
import { Fees } from 'src/modules/fees/entities/fee.entity';
import { Tax } from 'src/modules/tax/entities/tax.entity';
import { Discount } from 'src/modules/discount/database/discount.database';
import { formatDate, generatedId } from 'src/core/helpers/helper-functions.helper';
import Status from 'src/core/Interfaces/status.interface';



type ReceiptDocument = Receipt & Document;


@Schema({ timestamps: true })
class Receipt {
    // ------------------------------------- receipt data -------------------------------------

    @Prop({ type: Number, required: true, default: generatedId('number', 18, false), unique: true })
    receiptNumber: number;

    // ------------------------------------- car data -------------------------------------

    @Prop({ type: Types.ObjectId, ref: 'Car', required: true })
    car: Car;

    @Prop({ type: Types.ObjectId, ref: 'ParkingPlace', required: true })
    parkingPlace: ParkingPlace;

    // ------------------------------------- receipt status -------------------------------------

    @Prop({ type: Number, required: true, default: 5 })
    statusCode: number;

    @Prop({ type: String, required: false })
    status: string;

    // ------------------------------------- cost -------------------------------------

    @Prop({ type: Types.ObjectId, required: true, ref: 'Fees' })
    fees: Fees;

    @Prop({ type: Types.ObjectId, required: false, ref: 'Discount' })
    discount: Discount;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Tax' })
    tax: Tax;

    @Prop({ type: Number, required: true })
    totalFees: number;

    // ------------------------------------- time -------------------------------------

    @Prop({ type: String, default: formatDate(new Date) })
    createdAt: string;

    @Prop({ type: String, default: formatDate(new Date) })
    updatedAt: string;
};



const ReceiptSchema = SchemaFactory.createForClass(Receipt);


ReceiptSchema.pre('save', function (next) {
    const egyptTime = formatDate(new Date);
    this.createdAt = egyptTime;
    this.updatedAt = egyptTime;
    if (this.statusCode !== undefined && Status[this.statusCode]) this.set({ status: Status[this.statusCode] });
    next();
});

ReceiptSchema.pre('findOneAndUpdate', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as Receipt;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});

ReceiptSchema.pre('updateOne', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as Receipt;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});



export {
    ReceiptSchema,
    Receipt,
    ReceiptDocument
};