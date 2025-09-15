/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, } from '@nestjs/microservices';

import ElasticsearchService from 'src/modules/Utils/elasticsearch.util';



@Injectable()
export class RabbitMQElasticService implements OnModuleInit {
    private client: ClientProxy;

    constructor(private readonly esService: ElasticsearchService) { }

    onModuleInit() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://montaser:montaser@rabbitmq:5672'],
                queue: 'parking.cdc',
                queueOptions: { durable: true },
            },
        });
        this.listenToMessages();
    };

    async listenToMessages() {
        const channel = await this.client.connect();
        channel.consume('parking.cdc', async (msg) => {
            if (msg) {
                const event = JSON.parse(msg.content.toString());
                const { payload } = event; // Debezium wraps change events in payload
                const operation = payload.op; // c=insert, u=update, d=delete
                const doc = payload.after || payload.before;
                if (operation === 'c' || operation === 'u') {
                    await this.esService.index('products', doc);
                } else if (operation === 'd') {
                    await this.esService.delete('products', doc._id);
                };
                channel.ack(msg);
            };
        });
    };

};