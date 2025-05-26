/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import PaymentUtil from './payment.util';
import Util from './util.util';
import CryptoUtil from './crypto.util';



@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, }),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    providers: [PaymentUtil, Util, CryptoUtil,],
    exports: [PaymentUtil, Util, CryptoUtil,],
})
export default class UtilModule { };