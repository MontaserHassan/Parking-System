/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { ParkingPlace } from 'src/parking-place/entities/parking-place.entity';
import { formatDate } from '../../helpers/helper-functions.helper';
import Status from 'src/Interfaces/status.interface';



type CarDocument = Car & Document;


@Schema({ timestamps: true })
class Car {
    @Prop({ type: String, required: true, })
    licensePlate: string;

    @Prop({ type: Number, required: true, default: 3 })
    statusCode: number;

    @Prop({ type: String, required: false })
    status: string;

    @Prop({ type: Types.ObjectId, ref: 'ParkingPlace', required: true })
    parkingPlace: ParkingPlace;

    @Prop({ type: String, default: formatDate(new Date) })
    createdAt: string;

    @Prop({ type: String, default: formatDate(new Date) })
    updatedAt: string;
};



const CarSchema = SchemaFactory.createForClass(Car);


CarSchema.pre('save', function (next) {
    const egyptTime = formatDate(new Date);
    this.createdAt = egyptTime;
    this.updatedAt = egyptTime;
    if (this.statusCode !== undefined && Status[this.statusCode]) this.set({ status: Status[this.statusCode] });
    next();
});

CarSchema.pre('findOneAndUpdate', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as ParkingPlace;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});

CarSchema.pre('updateOne', function (next) {
    const egyptTime = formatDate(new Date);
    this.set({ updatedAt: egyptTime });
    const update = this.getUpdate() as ParkingPlace;
    if (update.statusCode !== undefined && Status[update.statusCode]) this.set({ status: Status[update.statusCode] });
    next();
});



export {
    CarSchema,
    Car,
    CarDocument
};