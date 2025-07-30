/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import NewsController from './news.controller';
import NewsService from './news.service';
import { News, NewsSchema } from './entities/news.entity';
import Util from 'src/modules/Utils/util.util';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema },]),
    ConfigModule.forRoot({ isGlobal: true, }),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [NewsController],
  providers: [NewsService, Util],
})
export default class NewsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply().forRoutes({ path: 'news', method: RequestMethod.POST || RequestMethod.PATCH });
  // };
};