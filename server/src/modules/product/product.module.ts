/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ProductController from './product.controller';
import ProductService from './product.service';
import ProductRepository from './product.repository';
import { Product, ProductSchema } from './entities/product.entities';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductRepository],
})
export default class ProductModule {};