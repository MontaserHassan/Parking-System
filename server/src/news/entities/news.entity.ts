/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { nanoid } from 'nanoid';
import CustomExceptionFilter from 'src/Error/error-exception.error';



type NewsDocument = News & Document;


@Schema({ timestamps: true })
class News {
    @Prop({ type: String, default: () => nanoid(24), })
    _id: string;

    @Prop({ type: String, required: true, })
    title: string;

    @Prop({ type: String, required: true })
    newsData: string;

    @Prop({ type: String })
    media: string;

    @Prop({ type: Boolean, required: true, default: false, })
    special: boolean;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
};


const NewsSchema = SchemaFactory.createForClass(News);


NewsSchema.pre<NewsDocument>('save', async function (next) {
    if (this.special) {
        const model = this.constructor as Model<NewsDocument>;
        const specialCount = await model.countDocuments({ special: true });
        if (specialCount >= 8) {
            throw new CustomExceptionFilter("You can't have more than 8 special news", HttpStatus.BAD_REQUEST, ["special"]);
            // const oldestSpecialDoc = await model.findOne({ special: true }).sort({ createdAt: 1 });
            // if (oldestSpecialDoc) {
            // await model.updateOne({ _id: oldestSpecialDoc._id }, { special: false });
            // };
        }
    }
    next();
});

NewsSchema.pre<NewsDocument>('findOneAndUpdate', async function (next) {
    if (this.special) {
        const model = this.constructor as Model<NewsDocument>;
        const specialCount = await model.countDocuments({ special: true });
        if (specialCount >= 8) {
            throw new CustomExceptionFilter("You can't have more than 8 special news", HttpStatus.BAD_REQUEST, ["special"]);
            // const oldestSpecialDoc = await model.findOne({ special: true }).sort({ createdAt: 1 });
            // if (oldestSpecialDoc) {
            // await model.updateOne({ _id: oldestSpecialDoc._id }, { special: false });
            // };
        };
    };
    next();
});



export {
    NewsSchema,
    News,
    NewsDocument
};