/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { addHours, addDays, addWeeks, addMonths, addYears, addMinutes } from 'date-fns';

import { SubscriptionWay } from 'src/Interfaces/subscription-way.interface';



@Injectable()
export default class Util {

    constructor() { };

    calculateExpiryDate(duration: string): { date: Date, expiryDurationPerSecond: number } {
        const [amount, unit] = duration.split(/(\d+)/).filter(Boolean);
        let expirationDate: Date;
        switch (unit) {
            case 't':
                expirationDate = addMinutes(new Date(), Number(amount));
                break;
            case 'h':
                expirationDate = addHours(new Date(), Number(amount));
                break;
            case 'd':
                expirationDate = addDays(new Date(), Number(amount));
                break;
            case 'w':
                expirationDate = addWeeks(new Date(), Number(amount));
                break;
            case 'm':
                expirationDate = addMonths(new Date(), Number(amount));
                break;
            case 'y':
                expirationDate = addYears(new Date(), Number(amount));
                break;
            default:
                expirationDate = addHours(new Date(), 24);
        };
        const expiryDurationPerSecond = Math.floor((expirationDate.getTime() - new Date().getTime()) / 1000);
        return { date: expirationDate, expiryDurationPerSecond: expiryDurationPerSecond };
    };

    generateCode() {
        const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const numbers = Math.floor(1000 + Math.random() * 9000).toString();
        return `${letter}${numbers}`;
    };

    calculateSubscriptionExpiryDate(subscriptionWay: string) {
        const currentDate = new Date();
        switch (subscriptionWay) {
            case SubscriptionWay.DAILY:
                return addDays(currentDate, 1);
            case SubscriptionWay.MONTHLY:
                return addMonths(currentDate, 1);
            case SubscriptionWay.QUARTER:
                return addMonths(currentDate, 3);
            case SubscriptionWay.HALF_YEAR:
                return addMonths(currentDate, 6);
            case SubscriptionWay.YEARLY:
                return addYears(currentDate, 1);
            default:
                return addMonths(currentDate, 1);
        };
    };

    generateAlphanumericCode(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        };
        return result;
    };

    generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    };

    generateId() {
        const chars = '0123456789';
        let id = '';
        for (let i = 0; i < 6; i++) {
            id += chars[Math.floor(Math.random() * chars.length)];
        };
        return id;
    };

    generateSecretKey() {
        const secretKey = Math.random().toString(36).slice(2);
        return secretKey;
    };

    decodeData(data: any) {
        try {
            const decodedString = Buffer.from(data, 'base64').toString('utf-8');
            const payload = JSON.parse(decodedString);
            const { info, hash } = payload;
            const computedHash = crypto.createHmac('sha256', process.env.SECRET_KEY).update(JSON.stringify(info)).digest('hex');
            if (computedHash === hash) {
                return { valid: true, data: info };
            } else {
                return { valid: false, data: null };
            };
        } catch (error) {
            return { valid: false, data: null };
        };
    };

    encodeData(data: any) {
        const dataString = JSON.stringify(data);
        const hash = crypto.createHmac('sha256', process.env.SECRET_KEY).update(dataString).digest('hex');
        const payload = { info: data, hash };
        const encodedData = Buffer.from(JSON.stringify(payload)).toString('base64');
        return encodedData;
    };

    pagination(totalDocuments: number, page: number, limit: number) {
        const pageSize = Number(limit) || 10;
        const currentPage = Number(page) || 1;
        const skip = (currentPage - 1) * pageSize;
        const totalPages = Math.ceil(totalDocuments / pageSize);
        return { limit: pageSize, skip: skip, totalDocuments: totalDocuments, totalPages: totalPages, currentPage: currentPage };
    };

};