/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import CustomExceptionFilter from 'src/core/Error/error-exception.error';



@Injectable()
export default class DevFeatureMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (process.env.PROD === '1') throw new CustomExceptionFilter('This service is not available in production now', HttpStatus.FORBIDDEN, []);
      next();
    } catch (err) {
      throw err;
    }
  };
};