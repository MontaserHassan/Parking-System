/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import ProductRepository from './product.repository';
import ElasticsearchService from '../Utils/elasticsearch.util';
import RedisUtil from '../Utils/redis.util';
import Util from '../Utils/util.util';
import CreateProductDto from './dto/create-product.dto';
import FilterProductDataDto from './dto/filter-product-data.dto';
import UpdateProductDto from './dto/update-product.dto';



@Injectable()
export default class ProductService {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly util: Util,
        private readonly redisUtil: RedisUtil,
        private readonly elasticsearchService: ElasticsearchService,
    ) { };

    async createProduct(createProductDto: CreateProductDto) {
        const newProduct = await this.productRepository.create(createProductDto);
        return newProduct;
    };

    async findAllProducts(filterProductDataDto: FilterProductDataDto) {
        const products = await this.productRepository.findAll(filterProductDataDto);
        return products;
    };

    async findProductById(id: string) {
        const product = await this.productRepository.findById(id);
        return product;
    };

    async totalProducts(filterProductDataDto: FilterProductDataDto) {
        const totalproducts = await this.productRepository.totalProducts(filterProductDataDto);
        return totalproducts;
    };

    async findAllProductsWithPagination(filterProductDataDto: FilterProductDataDto, page: number, limit: number,) {
        let totalNumberOfProducts = await this.redisUtil.getListLength('product');
        if (!totalNumberOfProducts) {
            const allProducts = await this.productRepository.findAll(filterProductDataDto);
            await this.redisUtil.generateRedisListKey(`product`, allProducts);
            totalNumberOfProducts = await this.redisUtil.getListLength('product');
        };
        const pagination = this.util.pagination(totalNumberOfProducts, Number(page), Number(limit));
        const products = await this.redisUtil.getRedisList(`product`, pagination.start, pagination.end);
        return {
            currentPage: pagination.currentPage,
            skip: pagination.skip,
            limit: pagination.limit,
            start: pagination.start + 1,
            end: pagination.end + 1,
            totalPages: pagination.totalPages,
            totalDocuments: pagination.totalDocuments,
            totalProductsForCurrentPage: products.length,
            products: products,
        };
    };

    async search(value: string) {
        // here i need to search on redis data by elasticsearch
        let products = [];
        products = await this.elasticsearchService.searchByKey('products', ['productName', 'currency', 'description'], value);
        return products;
    };

    async updateProduct(id: string, updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productRepository.update(id, updateProductDto);
        const updatedProductRedis = await this.redisUtil.updateValueInsideKey('product', id, updatedProduct);
        return updatedProductRedis;
    };

};