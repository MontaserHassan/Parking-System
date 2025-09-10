/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import ProductRepository from './product.repository';
import CreateProductDto from './dto/create-product.dto';
import FilterProductDataDto from './dto/filter-product-data.dto';



@Injectable()
export default class ProductService {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly util: Util, private readonly redisUtil: RedisUtil
    ) { };

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

    async findWithPagination(filterProductDataDto: FilterProductDataDto, page: number, limit: number,) {
        let totalNumberOfProducts = await this.redisUtil.getListLength('product');
        console.log('totalNumberOfProducts from redis: ', totalNumberOfProducts);
        if (!totalNumberOfProducts) {
            const allProducts = await this.productRepository.findAll({});
            await this.redisUtil.genereateRedisListKey(`product`, allProducts);
            totalNumberOfProducts = await this.redisUtil.getListLength('product');
            console.log('totalNumberOfProducts from db: ', totalNumberOfProducts);
        };
        const pagination = this.util.pagination(totalNumberOfProducts, Number(page), Number(limit));
        console.log('pagination: ', pagination);
        const products = await this.redisUtil.getRedisList(`product`, pagination.start, pagination.end);
        return {
            currentPage: pagination.currentPage,
            skip: pagination.skip,
            limit: pagination.limit,
            totalPages: pagination.totalPages,
            totalDocuments: pagination.totalDocuments,
            totalProductsForCurrentPage: products.length,
            products: products,
        };
    };

};