/* eslint-disable prettier/prettier */
import Redis from 'ioredis';



const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
});



export default redisClient;