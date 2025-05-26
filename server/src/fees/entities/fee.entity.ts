/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { formatDate } from '../../helpers/helper-functions.helper';



type FeesDocument = Fees & Document;


@Schema({ timestamps: true })
class Fees {
    // ------------------------------------- Discount data -------------------------------------
    @Prop({ type: String, required: true })
    reservationType: string;

    @Prop({ type: String, required: true })
    reservationTypeName: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: String, required: true })
    currency: string;

    @Prop({ type: Types.ObjectId, ref: 'Tax', required: true })
    tax: string;

    // ------------------------------------- time -------------------------------------

    @Prop({ type: String, default: formatDate(new Date) })
    createdAt: string;

    @Prop({ type: String, default: formatDate(new Date) })
    updatedAt: string;
};


const FeesSchema = SchemaFactory.createForClass(Fees);

FeesSchema.pre('save', function (next) {
    const egyptTime = formatDate(new Date);
    this.createdAt = egyptTime;
    this.updatedAt = egyptTime;
    next();
});

FeesSchema.pre('findOneAndUpdate', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    next();
});

FeesSchema.pre('updateOne', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    next();
});



export {
    FeesSchema,
    Fees,
    FeesDocument
};