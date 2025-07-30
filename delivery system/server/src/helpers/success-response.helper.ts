/* eslint-disable prettier/prettier */
import { Request, Response } from '@nestjs/common';

import { ResponseInterface } from 'src/Interfaces/response.interface';
import { formatDate } from 'src/helpers/helper-functions.helper';
import { handleResponseMessage } from 'src/helpers/response.helper';



export default class SuccessResponse {

    constructor() { };

    static async send(@Request() req, @Response() res, responseValue: ResponseInterface) {
        const lang = req.query?.lang?.toString() || 'en';
        const successResponse = {
            path: req.url,
            method: req.method,
            status: 'success',
            appName: process.env.APP_NAME,
            timestamp: formatDate(new Date()),
            responseCode: responseValue.responseCode || 200,
            responseMessage: await handleResponseMessage(lang, responseValue.responseMessage),
            data: responseValue.data,
        };
        res.locals = successResponse;
        return res.status(responseValue.responseCode).send(successResponse);
    };

};