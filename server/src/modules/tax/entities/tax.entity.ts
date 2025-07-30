/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

import { formatDate, generatedId } from 'src/core/helpers/helper-functions.helper';
import Status from 'src/core/Interfaces/status.interface';



type TaxDocument = Tax & Document;


@Schema({ timestamps: true })
class Tax {
    // ------------------------------------- Tax data -------------------------------------

    @Prop({ type: String, required: true, default: () => generatedId('string', 6, true), unique: true })
    taxCode: string;

    @Prop({ type: Number, required: true })
    taxPercentage: number;

    @Prop({ type: String, required: true, default: '%' })
    taxType: string;

    @Prop({ type: String, required: true })
    taxDescription: string;

    // ------------------------------------- Tax status -------------------------------------

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



const TaxSchema = SchemaFactory.createForClass(Tax);


TaxSchema.pre('save', function (next) {
    const egyptTime = formatDate(new Date);
    this.createdAt = egyptTime;
    this.updatedAt = egyptTime;
    if (this.statusCode !== undefined && Status[this.statusCode]) this.set({ status: Status[this.statusCode] });
    next();
});

TaxSchema.pre('findOneAndUpdate', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as Tax;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});

TaxSchema.pre('updateOne', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as Tax;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});



export {
    TaxSchema,
    Tax,
    TaxDocument
};