/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

import { formatDate, generatedId } from 'src/core/helpers/helper-functions.helper';
import Status from 'src/core/Interfaces/status.interface';



type DiscountDocument = Discount & Document;


@Schema({ timestamps: true })
class Discount {
    // ------------------------------------- Discount data -------------------------------------

    @Prop({ type: String, required: true, default: () => generatedId('string', 6, true), unique: true })
    discountCode: string;

    @Prop({ type: Number, required: true })
    discountPercentage: number;

    @Prop({ type: String, required: true, default: '%' })
    discountType: string;

    @Prop({ type: String, required: true })
    discountDescription: string;

    @Prop({ type: String, required: true })
    discountExpiryDate: string;

    @Prop({ type: Date, required: true })
    formattedExpiryDate: Date;

    @Prop({ type: Boolean, required: true, default: true })
    isValid: boolean;

    // ------------------------------------- Discount status -------------------------------------

    @Prop({ type: Number, required: true, default: 7 })
    statusCode: number;

    @Prop({ type: String, required: false })
    status: string;

    // ------------------------------------- time -------------------------------------

    @Prop({ type: String, default: formatDate(new Date) })
    createdAt: string;

    @Prop({ type: String, default: formatDate(new Date) })
    updatedAt: string;
};



const DiscountSchema = SchemaFactory.createForClass(Discount);


DiscountSchema.pre('save', function (next) {
    const egyptTime = formatDate(new Date);
    this.createdAt = egyptTime;
    this.updatedAt = egyptTime;
    if (this.statusCode !== undefined && Status[this.statusCode]) this.set({ status: Status[this.statusCode] });
    next();
});

DiscountSchema.pre('findOneAndUpdate', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as Discount;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});

DiscountSchema.pre('updateOne', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as Discount;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});



export {
    DiscountSchema,
    Discount,
    DiscountDocument
};