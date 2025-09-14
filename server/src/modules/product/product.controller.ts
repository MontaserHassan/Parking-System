/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpStatus, Response, Request, Get, Query, Param, Patch, } from '@nestjs/common';

import ProductService from './product.service';
import SuccessProductMessage from './Messages/success.message';
import CreateProductDto from './dto/create-product.dto';
import SuccessResponse from 'src/core/helpers/success-response.helper';
import UpdateProductDto from './dto/update-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';



@Controller('product')
export default class ProductController {

    constructor(private readonly productService: ProductService,) { };

    @Post('/')
    async create(@Request() req, @Response() res, @Body() createProductDto: CreateProductDto,) {
        try {
            const newProduct = await this.productService.createProduct(createProductDto);
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
            const products = await this.productService.findAllProductsWithPagination({}, Number(page), Number(limit),);
            return SuccessResponse.send(req, res, {
                responseCode: HttpStatus.OK,
                responseMessage: SuccessProductMessage.GET_ALL_PRODUCTS,
                data: {
                    products,
                },
            });
        } catch (err) {
            throw err;
        };
    };

    @Get('/:id')
    async findOne(@Request() req, @Response() res, @Param('id') id: string) {
        try {
            const product = await this.productService.findProductById(id);
            return SuccessResponse.send(req, res, {
                responseCode: HttpStatus.OK,
                responseMessage: SuccessProductMessage.GET_ONE_PRODUCT,
                data: {
                    product,
                },
            });
        } catch (err) {
            throw err;
        };
    };

    @Get('/search/:value')
    async search(@Request() req, @Response() res, @Param('value') value: string) {
        try {
            const products = await this.productService.search(value);
            return SuccessResponse.send(req, res, {
                responseCode: HttpStatus.OK,
                responseMessage: SuccessProductMessage.SEARCH_PRODUCTS,
                data: {
                    products,
                },
            });
        } catch (err) {
            throw err;
        };
    };

    @Patch('/:id')
    async update(@Request() req, @Response() res, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        try {
            const updatedProduct = await this.productService.updateProduct(id, updateProductDto);
            return SuccessResponse.send(req, res, {
                responseCode: HttpStatus.OK,
                responseMessage: SuccessProductMessage.UPDATED,
                data: {
                    product: updatedProduct,
                },
            });
        } catch (err) {
            throw err;
        };
    };

};