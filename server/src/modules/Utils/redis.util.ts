/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import redisClient from 'src/config/redis.config';



@Injectable()
export default class RedisUtil {

    constructor() { };

    safeParse(item: string) {
        try {
            return JSON.parse(item);
        } catch (e) {
            return item;
        };
    };

    async generateRedisKey(key: string, data: any) {
        const newKey = await redisClient.set(key, JSON.stringify(data), 'EX', 3600);
        return newKey;
    };

    async generateRedisListKey(key: string, data: any[]) {
        await this.deleteRedisKey(key);
        const pipeline = redisClient.multi();
        data.forEach(item => { pipeline.rpush(key, JSON.stringify(item)); });
        await pipeline.exec();
        await redisClient.expire(key, 3600);
        return key;
    };

    async addElementToRedisList(key: string, element: any) {
        const newKey = await redisClient.rpush(key, element);
        return newKey;
    };

    async getRedisKey(key: string) {
        const data = await redisClient.get(key);
        return JSON.parse(data);
    };

    async getRedisKeysByPattern(pattern: string) {
        const keys = await redisClient.keys(pattern);
        return keys;
    };

    async updateValueInsideKey(key: string, id: string, newData: any) {
        const list = await redisClient.lrange(key, 0, -1);
        const parsed = list.map(item => JSON.parse(item));
        const index = parsed.findIndex(item => item._id === id);
        if (index === -1) return null;
        parsed[index] = newData;
        await redisClient.lset(key, index, JSON.stringify(parsed[index]));
        return parsed[index];
    };

    async getListLength(key: string) {
        const length = await redisClient.llen(key);
        return length;
    };

    async getRedisList(key: string, start: number, end: number) {
        const data = await redisClient.lrange(key, start, end);
        const parsedData = data.map(item => this.safeParse(item));
        return parsedData;
    };

    async deleteRedisKey(key: string) {
        const data = await redisClient.del(key);
        return data;
    };

};