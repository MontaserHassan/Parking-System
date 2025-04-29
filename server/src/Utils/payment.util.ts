/* eslint-disable prettier/prettier */
import { stripe } from '../Configs/stripe.config';



export default class PaymentUtil {

    constructor() { };

    async createCheckoutSession(name: string, transactionId: number, amount: string, currency: string, expiryDate: Date, isIncreasing: boolean,) {
        try {
            const lineItems = [
                {
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: { name: name.toLowerCase(), },
                        unit_amount: Math.round(Number(amount) * 100),
                    },
                    quantity: 1,
                },
            ];
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${isIncreasing ? process.env.INCREASING_SUCCESS_URL : process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CANCEL_URL}?session_id={CHECKOUT_SESSION_ID}`,
                expires_at: Math.floor(expiryDate.getTime() / 1000),
                metadata: {
                    transactionId: transactionId.toString(),
                },
            });
            if (!session) return false;
            return session;
        } catch (err) {
            return false;
        };
    };


    // ----------------------------- retrieve checkout session -----------------------------


    async retrieveCheckoutSession(sessionId: string): Promise<{ session: string; transactionId: string } | false> {
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (!session) return false;
            return { session: session.id, transactionId: session.metadata?.transactionId || '' };
        } catch (err) {
            return false;
        };
    };

};