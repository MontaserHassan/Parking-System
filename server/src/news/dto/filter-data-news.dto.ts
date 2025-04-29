/* eslint-disable prettier/prettier */
export default class FilterNewsDataDto {
    readonly newsId?: string;
    readonly special: boolean;
    readonly page?: number;
    readonly limit?: number;
};