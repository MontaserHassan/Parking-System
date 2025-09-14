/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import client from 'src/config/elasticsearch.config';



@Injectable()
export default class ElasticsearchUtil {

    constructor() { };

    async index(index: string, value: any) {
        return client.index({ index: index, id: value._id.toString(), document: value, });
    };

    async searchByKey(index: string, fields: string[], value: string) {
        const result = await client.search({
            index,
            query: {
                multi_match: {
                    query: value,
                    fields: fields,
                    fuzziness: 'AUTO',
                },
            },
            _source: ['_id'],
        });
        return result.hits.hits.map((hit) => ({ _id: hit._id, ...(hit._source as Record<string, any>), }));
    };

    async update(index: string, id: string, value: any) {
        return client.update({ index: index, id: id, doc: value, });
    };

    async delete(index: string, id: string) {
        return client.delete({ index: index, id: id, });
    };

    async createIndex(index: string) {
        const exists = await client.indices.exists({ index });
        if (!exists) return client.indices.create({ index });
        return;
    };

    async deleteIndex(index: string) {
        const exists = await client.indices.exists({ index });
        if (exists) return client.indices.delete({ index });
        return;
    };

};