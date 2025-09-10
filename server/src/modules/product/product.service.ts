/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import ProductRepository from './product.repository';
import CreateProductDto from './dto/create-product.dto';
import FilterProductDataDto from './dto/filter-product-data.dto';



@Injectable()
export default class ProductService {

    constructor(private readonly productRepository: ProductRepository) { };

    async create(createProductDto: CreateProductDto) {
        const newProduct = await this.productRepository.create(createProductDto);
        return newProduct;
    };

    async findAll(filterProductDataDto: FilterProductDataDto) {
        const products = await this.productRepository.findAll(filterProductDataDto);
        return products;
    };

    async totalProducts(filterProductDataDto: FilterProductDataDto) {
        const totalproducts = await this.productRepository.totalProducts(filterProductDataDto);
        return totalproducts;
    };

    async findWithPagination(filterProductDataDto: FilterProductDataDto, limit: number, skip: number) {
        const totalProducts = await this.productRepository.findWithPagination(filterProductDataDto, limit, skip);
        return totalProducts;
    };

};