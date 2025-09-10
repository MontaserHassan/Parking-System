/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import redisClient from 'src/config/redis.config';



@Injectable()
export default class RedisUtil {

    constructor() { };

    async generateRedisKey(key: string, data: any) {
        const newKey = await redisClient.set(key, JSON.stringify(data), 'EX', 3600);
        return newKey;
    };

    async genereateRedisListKey(key: string, data: any) {
        await this.deleteRedisKey(key);
        const newKey = redisClient.rpush(key, data, 'EX', 3600);
        return newKey;
    };

    async addElementToRedisList(key: string, element: any) {
        const newKey = await redisClient.rpush(key, element);
        return newKey;
    };

    async getRedisKey(key: string) {
        const data = await redisClient.get(key);
        return JSON.parse(data);
    };

    async getListLength(key: string) {
        const length = await redisClient.llen(key);
        return length;
    };

    async getRedisList(key: string, start: number, end: number) {
        const data = await redisClient.lrange(key, start, end);
        return data;
    };

    async deleteRedisKey(key: string) {
        const data = await redisClient.del(key);
        return data;
    };

};