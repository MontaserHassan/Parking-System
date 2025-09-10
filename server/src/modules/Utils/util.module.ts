/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import PaymentUtil from './payment.util';
import Util from './util.util';
import CryptoUtil from './crypto.util';
import PDFUtil from './pdf.util';
import MailUtil from './mail.util';
import RedisUtil from './redis.util';



@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, }),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    providers: [PaymentUtil, Util, CryptoUtil, PDFUtil, MailUtil, RedisUtil],
    exports: [PaymentUtil, Util, CryptoUtil, PDFUtil, MailUtil, RedisUtil],
})
export default class UtilModule { };