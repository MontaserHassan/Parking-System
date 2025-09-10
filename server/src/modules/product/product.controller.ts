/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpStatus, Response, Request, Get, Query, } from '@nestjs/common';

import ProductService  from './product.service';
import Util from '../Utils/util.util';
import SuccessProductMessage from './Messages/success.message';
import  CreateProductDto  from './dto/create-product.dto';
import SuccessResponse from 'src/core/helpers/success-response.helper';
// import { UpdateProductDto } from './dto/update-product.dto';



@Controller('product')
export default class ProductController {

    constructor(private readonly productService: ProductService,private readonly util: Util) {};

    @Post('/')
    async create(@Request() req, @Response() res,@Body() createProductDto: CreateProductDto,) {
        try {
            const newProduct = await this.productService.create(createProductDto);
            // use redis
            return SuccessResponse.send(req, res, {
                responseCode: HttpStatus.CREATED,
                responseMessage: SuccessProductMessage.CREATED,
                data: {
                    product: newProduct,
                },
            });
        } catch (err) {
            throw err;
        };
    };

    @Get('/')
    async findAll(@Request() req, @Response() res, @Query('limit') limit: string, @Query('page') page: string) {
        try {
            //  check on redis first
            const totalProducts = await this.productService.totalProducts({});
            const pagination = this.util.pagination(totalProducts, Number(page), Number(limit));
            const products = await this.productService.findWithPagination({}, pagination.limit, pagination.skip);
            return SuccessResponse.send(req, res, {
                responseCode: HttpStatus.OK,
                responseMessage: SuccessProductMessage.GET_ALL_PRODUCTS,
                data: {
                    currentPage: pagination.currentPage,
                    skip: pagination.skip,
                    limit: pagination.limit,
                    totalPages: pagination.totalPages,
                    totalProductsForCurrentPage: products.length,
                    totalProducts: pagination.totalDocuments,
                    products: products,
                },
            });
        } catch (err) {
            throw err;
        }
    };

};