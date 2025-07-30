/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

import { formatDate, } from 'src/core/helpers/helper-functions.helper';



type ContactUSDocument = ContactUS & Document;


@Schema({ timestamps: true })
class ContactUS {
    // ------------------------------------- ContactUS data -------------------------------------

    @Prop({ type: Number, required: true })
    messageId: number;

    @Prop({ type: String, })
    content: string;

    @Prop({ type: String, required: true })
    userName: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phoneNumber: string;

    // ------------------------------------- time -------------------------------------

    @Prop({ type: String, default: formatDate(new Date) })
    createdAt: string;

    @Prop({ type: String, default: formatDate(new Date) })
    updatedAt: string;
};


const ContactUSSchema = SchemaFactory.createForClass(ContactUS);



export {
    ContactUSSchema,
    ContactUS,
    ContactUSDocument
};