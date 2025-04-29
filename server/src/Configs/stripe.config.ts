/* eslint-disable prettier/prettier */
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
