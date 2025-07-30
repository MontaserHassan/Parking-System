/* eslint-disable prettier/prettier */
import axios from 'axios';



export default class DeliveryUtil {

    private readonly DELIVERY_API: string = process.env.DELIVERY_API;
    private readonly ORGANIZATION_ID: string = process.env.ORGANIZATION_ID;
    private readonly ORGANIZATION_PASS: string = process.env.ORGANIZATION_PASS;

    constructor() { };

    private getHeaders() {
        return {
            headers: { organizationId: this.ORGANIZATION_ID, organizationPass: this.ORGANIZATION_PASS, 'Content-Type': 'application/json', },
        };
    };

    async createShipment(payload: Record<string, any>) {
        try {
            const response = await axios.post(`${this.DELIVERY_API}/`, payload, this.getHeaders(),);
            return response.data;
        } catch (error) {
            throw error;
        };
    };

    async checkFees(shipmentData: Record<string, any>) {
        try {
            const response = await axios.post(`${this.DELIVERY_API}/fees`, { shipmentData }, this.getHeaders(),);
            return response.data;
        } catch (error) {
            throw error;
        };
    };

    async getShipmentData(shipmentId: string) {
        try {
            const response = await axios.get(`${this.DELIVERY_API}/${shipmentId}`, this.getHeaders(),);
            return response.data;
        } catch (error) {
            throw error;
        };
    };

    async cancelShipment(shipmentId: string) {
        try {
            const response = await axios.post(`${this.DELIVERY_API}/${shipmentId}`, {}, this.getHeaders(),);
            return response.data;
        } catch (error) {
            throw error;
        };
    };
};