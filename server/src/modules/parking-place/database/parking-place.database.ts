/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Car } from 'src/modules/cars/database/car.database';
import { formatDate } from 'src/core/helpers/helper-functions.helper';
import Status from 'src/core/Interfaces/status.interface';



type ParkingPlaceDocument = ParkingPlace & Document;


@Schema({ timestamps: true })
class ParkingPlace {
    @Prop({ required: true })
    placeNumber: string;

    @Prop({ type: Number, required: true, })
    floorNumber: number;

    @Prop({ type: Types.ObjectId, ref: 'Car', required: false })
    car: Car;

    @Prop({ type: Number, required: true, default: 1 })
    statusCode: number;

    @Prop({ type: String, required: false })
    status: string;

    @Prop({ type: String, default: formatDate(new Date) })
    createdAt: string;

    @Prop({ type: String, default: formatDate(new Date) })
    updatedAt: string;
};



const ParkingPlaceSchema = SchemaFactory.createForClass(ParkingPlace);


ParkingPlaceSchema.index({ placeNumber: 1, status: 1 });
ParkingPlaceSchema.index({ placeNumber: 1, floorNumber: 1 });


ParkingPlaceSchema.pre('save', function (next) {
    const egyptTime = formatDate(new Date);
    this.createdAt = egyptTime;
    this.updatedAt = egyptTime;
    if (this.statusCode !== undefined && Status[this.statusCode]) this.set({ status: Status[this.statusCode] });
    next();
});

ParkingPlaceSchema.pre('findOneAndUpdate', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as ParkingPlace;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});

ParkingPlaceSchema.pre('updateOne', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as ParkingPlace;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});



export {
    ParkingPlaceSchema,
    ParkingPlaceDocument,
    ParkingPlace,
};