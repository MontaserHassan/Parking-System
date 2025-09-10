/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types,  } from 'mongoose';

import { formatDate } from 'src/core/helpers/helper-functions.helper';



type ProductDocument = Product & Document;


@Schema({ timestamps: true })
class Product {
    // ------------------------------------- product data -------------------------------------
    @Prop({ type: String, required: true })
    productName: string;

    @Prop({ type: Types.ObjectId, required: false, ref: 'category' })
    categoryId: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: String, required: true })
    currency: string;

  // ------------------------------------- timestamps -------------------------------------
    @Prop({type: Date})
    createdAt?: Date | string;

    @Prop({type: Date})
    updatedAt?: Date | string;

};


const ProductSchema = SchemaFactory.createForClass(Product);


ProductSchema.set('toJSON', {
    transform: (_doc, ret) => {
        if (ret.createdAt) ret.createdAt = formatDate(new Date(ret.createdAt));
        if (ret.updatedAt) ret.updatedAt = formatDate(new Date(ret.updatedAt));
        return ret;
    },
});

ProductSchema.set('toObject', {
    transform: (_doc, ret) => {
        if (ret.createdAt) ret.createdAt = formatDate(new Date(ret.createdAt));
        if (ret.updatedAt) ret.updatedAt = formatDate(new Date(ret.updatedAt));
        return ret;
    },
});


export {
    ProductSchema,
    Product,
    ProductDocument
};