/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UseGuards, Request, Response, HttpStatus, } from '@nestjs/common';

import NewsService from './news.service';
import Util from 'src/modules/Utils/util.util';
import CustomExceptionFilter from 'src/core/Error/error-exception.error';
import { handleResponseMessage } from 'src/core/helpers/response.helper';
import CreateNewsDto from './dto/create-news.dto';
import UpdateNewsDto from './dto/update-news.dto';
import { ErrorNewsMessage, SuccessNewsMessage } from './Messages/index.message'



@Controller('news')
export default class NewsController {

  constructor(private readonly newsService: NewsService, private readonly util: Util) { };

  @Post('/')
  @UseGuards()
  async create(@Request() req, @Response() res, @Body() createNewsDto: CreateNewsDto, @Query('lang') lang: string) {
    try {
      const newNews = await this.newsService.create(createNewsDto);
      if (!newNews) throw new CustomExceptionFilter(ErrorNewsMessage.NOT_CREATED, 400, ['news']);
      const response = {
        responseMessage: await handleResponseMessage(lang, SuccessNewsMessage.CREATED),
        responseCode: HttpStatus.CREATED,
        data: {
          news: newNews
        },
      };
      res.locals = response;
      return res.status(response.responseCode).send(response);
    } catch (err) {
      throw err;
    };
  };

  @Get('/')
  async findAll(@Response() res, @Query('lang') lang: string, @Query('page') page: number, @Query('limit') limit: number) {
    try {
      const totalDocuments = await this.newsService.totalDocuments();
      const pagination = this.util.pagination(totalDocuments, Number(page), Number(limit));
      const allNews = await this.newsService.findWithPagination(pagination.limit, pagination.skip);
      const response = {
        responseMessage: await handleResponseMessage(lang, SuccessNewsMessage.GET_ALL_NEWS),
        responseCode: HttpStatus.OK,
        data: {
          allNews: allNews,
          currentPage: pagination.currentPage,
          skip: pagination.skip,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          totalDocuments: pagination.totalDocuments,
        },
      };
      res.locals = response;
      return res.status(response.responseCode).send(response);
    } catch (err) {
      throw err;
    };
  };

  @Get('/slider')
  async findSlider(@Response() res, @Query('lang') lang: string,) {
    try {
      const sliderNews = await this.newsService.findByProps({ special: true });
      const response = {
        responseMessage: await handleResponseMessage(lang, SuccessNewsMessage.GET_FOR_SLIDER),
        responseCode: HttpStatus.OK,
        data: {
          news: sliderNews,
          sliderLength: sliderNews.length,
        },
      };
      res.locals = response;
      return res.status(response.responseCode).send(response);
    } catch (err) {
      throw err;
    };
  };

  @Get('/:newsId')
  async findOne(@Response() res, @Param('newsId') newsId: string, @Query('lang') lang: string) {
    try {
      const news = await this.newsService.findById(newsId);
      if (!news) throw new CustomExceptionFilter(ErrorNewsMessage.NOT_FOUND, 404, ['news']);
      const response = {
        responseMessage: await handleResponseMessage(lang, SuccessNewsMessage.GET_ONE_NEWS),
        responseCode: HttpStatus.OK,
        data: {
          news: news,
        },
      };
      res.locals = response;
      return res.status(response.responseCode).send(response);
    } catch (err) {
      throw err;
    };
  };

  @Patch('/')
  @UseGuards()
  async update(@Request() req, @Response() res, @Body() updateNewsDto: UpdateNewsDto, @Query('lang') lang: string) {
    try {
      const isMediaExisting = await this.newsService.findById(updateNewsDto.newsId);
      if (!isMediaExisting) throw new CustomExceptionFilter(ErrorNewsMessage.NOT_FOUND, 404, ['news']);
      updateNewsDto.media = updateNewsDto.media && updateNewsDto.media != 'null' ? updateNewsDto.media : isMediaExisting.media;
      updateNewsDto.special = updateNewsDto.special ? updateNewsDto.special : isMediaExisting.special;
      const updatedNews = await this.newsService.update(updateNewsDto);
      const response = {
        responseMessage: await handleResponseMessage(lang, SuccessNewsMessage.UPDATED),
        responseCode: HttpStatus.OK,
        data: {
          news: updatedNews,
        },
      };
      res.locals = response;
      return res.status(response.responseCode).send(response);
    } catch (err) {
      throw err;
    };
  };

  @Delete('/:newsId')
  async remove(@Response() res, @Param('newsId') newsId: string, @Query('lang') lang: string) {
    try {
      await this.newsService.remove(newsId);
      const response = {
        responseMessage: await handleResponseMessage(lang, SuccessNewsMessage.DELETED),
        responseCode: HttpStatus.OK,
        data: {},
      };
      res.locals = response;
      return res.status(response.responseCode).send(response);
    } catch (err) {
      throw err;
    };
  };

};