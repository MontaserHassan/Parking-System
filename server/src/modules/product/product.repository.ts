/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './entities/product.entities';
import CreateProductDto from './dto/create-product.dto';
import FilterProductDataDto from './dto/filter-product-data.dto';
import UpdateProductDto from './dto/update-product.dto';



@Injectable()
export default class ProductRepository {

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { };

    async create(createProductDto: CreateProductDto) {
        const newProduct = await this.productModel.create(createProductDto);
        return newProduct;
    };

    async findAll(filterProductDataDto: FilterProductDataDto) {
        const products = await this.productModel.find(filterProductDataDto).select('-__v');
        return products;
    };

    async findById(id: string) {
        const product = await this.productModel.findById(id).select('-__v');
        return product;
    }

    async findOne(filterProductDataDto: FilterProductDataDto) {
        const product = await this.productModel.findOne(filterProductDataDto).select('-__v');
        return product;
    };

    async totalProducts(filterProductDataDto: FilterProductDataDto) {
        const totalproducts = await this.productModel.countDocuments(filterProductDataDto);
        return totalproducts;
    };

    async findWithPagination(filterProductDataDto: FilterProductDataDto, limit: number, skip: number) {
        const totalProducts = await this.productModel.find(filterProductDataDto).limit(limit).skip(skip).select('-__v');
        return totalProducts;
    };

    async update(id: string, updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).select('-__v');
        return updatedProduct;
    };

};