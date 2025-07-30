/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';



@Injectable()
export default class MailUtil {

    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SERVICE'),
            port: this.configService.get<number>('MAIL_PORT'),
            auth: {
                user: this.configService.get<string>('SENDER_EMAIL'),
                pass: this.configService.get<string>('SENDER_PASSWORD'),
            },
        });
    };

    async sendEmail(email: string, userName: string, subject: string, template: string, extraData?: Record<string, any>, decodedDetails?: string) {
        try {
            const userEmail = extraData?.userEmail;
            const phoneNumber = extraData?.phoneNumber;
            const messageId = extraData?.messageId;
            const content = extraData?.content;
            const pathTemplate = path.resolve(__dirname, '../../../src/templates/', template);
            const templateSource = fs.readFileSync(pathTemplate, 'utf-8');
            const compiledTemplate = Handlebars.compile(templateSource);
            const htmlContent = compiledTemplate({
                userName,
                userEmail,
                phoneNumber,
                messageId,
                content,
            });
            const mailResult = await this.transporter.sendMail({
                from: this.configService.get<string>('SENDER_EMAIL'),
                to: email,
                subject: subject,
                text: subject,
                html: htmlContent,
            });
            return mailResult;
        } catch (error) {
            console.log('error: ', error);
        };
    };

};