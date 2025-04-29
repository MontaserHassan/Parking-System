/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { News, NewsDocument } from './entities/news.entity';
import CreateNewsDto from './dto/create-news.dto';
import UpdateNewsDto from './dto/update-news.dto';
import FilterNewsDataDto from './dto/filter-data-news.dto';



@Injectable()
export default class NewsService {

  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) { }

  async create(createNewsDto: CreateNewsDto) {
    const createdNews = await this.newsModel.create(createNewsDto);
    return createdNews;
  };

  async findAll(): Promise<News[]> {
    const allNews = await this.newsModel.find().select('-__v').sort({ createdAt: -1 });
    return allNews;
  };

  async findByProps(filterNewsDataDto: FilterNewsDataDto): Promise<News[]> {
    const allNews = await this.newsModel.find(filterNewsDataDto).select('-__v').sort({ createdAt: -1 });
    return allNews;
  };

  async findById(newsId: string): Promise<News> {
    const oneNews = await this.newsModel.findById(newsId).select('-__v');
    return oneNews;
  };

  async findOne(filterNewsDataDto: FilterNewsDataDto): Promise<News> {
    const oneNews = await this.newsModel.findOne(filterNewsDataDto).select('-__v');
    return oneNews;
  };

  async totalDocuments(): Promise<number> {
    const totalNews = await this.newsModel.countDocuments();
    return totalNews;
  };

  async findWithPagination(limit: number, skip: number): Promise<News[]> {
    const allNewsWithPagination = await this.newsModel.find().skip(skip).limit(limit).select('-__v').sort({ createdAt: -1 });
    return allNewsWithPagination;
  };

  async update(updateNewsDto: UpdateNewsDto): Promise<News> {
    const updatedNews = await this.newsModel.findByIdAndUpdate(updateNewsDto.newsId, updateNewsDto, { new: true }).select('-__v');
    return updatedNews;
  };

  async remove(newsId: string) {
    const deletedNews = await this.newsModel.findByIdAndDelete({ _id: newsId });
    return deletedNews;
  };

};