/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, BadRequestException, HttpStatus, } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';

import CustomExceptionFilter from '../Error/error-exception.error';
import { CommonMessage } from 'src/core/Messages/index.message';
import { formatDate } from 'src/core/helpers/helper-functions.helper';
import { handleResponseMessage } from 'src/core/helpers/response.helper';
import logger from 'src/config/logger.config';



@Catch()
export default class ValidationExceptionFilter implements ExceptionFilter {

    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const lang = request.query?.lang?.toString() || 'en';
        const isProd = process.env.PROD === '1';

        if (response.headersSent) return;

        let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string = CommonMessage.SERVER_DOWN;
        let fields: string[] | null = null;
        let details: string[] | null = null;

        if (exception instanceof CustomExceptionFilter) {
            status = exception.getStatus();
            const exceptionResponse: any = exception.getResponse();
            message = exceptionResponse.message;
            fields = exceptionResponse.fields;
        } else if (exception instanceof NotFoundException) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (exception instanceof BadRequestException) {
            status = exception.getStatus();
            const exceptionResponse: any = exception.getResponse();
            const validationMessages = exceptionResponse.message;
            message = Array.isArray(validationMessages) ? validationMessages[0] : validationMessages;
            fields = Array.isArray(validationMessages) ? validationMessages : [validationMessages];
            details = Array.isArray(validationMessages) ? validationMessages : [validationMessages];
        } else if (exception instanceof MongoServerError) {
            if (exception.code === 11000) {
                message = exception.message;
            } else {
                message = `This ${Object?.values(exception?.keyValue)?.join(', ')} value for key ${Object?.keys(exception?.keyPattern)?.join(', ')} already exists.` || exception.message;
            };
            status = HttpStatus.CONFLICT;
            details = exception.keyValue;
        };

        const Response = {
            path: request.url,
            method: request.method,
            status: 'error',
            appName: process.env.APP_NAME,
            timestamp: formatDate(new Date()),
            responseCode: status,
            responseMessage: await handleResponseMessage(lang, message),
            fields: fields,
            details: details,
        };
        response.locals = Response;
        if (isProd) logger.error(`Error at path: ${Response.path}`, { request, response, requestNumberTrace: request.requestNumberTrace }, Response);
        return response.status(Response.responseCode).send(Response);
    };

};