/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

import PDFUtil from 'src/modules/Utils/pdf.util';
// import openai from 'src/config/openai.config';
import ProductRepository from '../product/product.repository';



@Injectable()
export default class OpenaiService {

  private readonly baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private readonly apiKey = process.env.GROQ_API_KEY;

  constructor(
    private readonly productRe: ProductRepository,
    private readonly pdfUtil: PDFUtil,
  ) { };

  async generateInventorySummary(): Promise<string> {
    try {
      const products = await this.productRe.findAll({});
      console.log('products: ', products);
      const prompt = `
      You are an assistant that writes professional product descriptions for an online shop.
      Here is the product data in JSON format:
        ${products.length > 0 ? JSON.stringify(products, null, 2) : 'No products available'}
      Tasks:
        1. Write a concise and appealing product description for customers (2–3 sentences).
        2. Suggest 3 unique selling points (bullet points).
        3. Recommend a short SEO-friendly tagline (max 10 words).
        4. Suggest a fair price adjustment if necessary (based on the given price and currency).
        5. Format the output in markdown with appropriate headings and bullet points.
      Ensure the description is engaging and highlights the product's features effectively.
    `;

      // const resp = await openai.chat.completions.create({
      //   model: 'gpt-3.5-turbo',
      //   messages: [{ role: 'user', content: prompt }],
      //   max_tokens: 700
      // });
      const response = await axios.post(
        this.baseUrl,
        {
          model: 'meta-llama/llama-4-scout-17b-16e-instruct', // Free supported model
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 700,
        },
        { headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json', } },
      );
      const summary = response.data.choices?.[0]?.message?.content?.trim() ?? 'No summary generated';
      console.log('summary: ', summary);
      const pdf = await this.pdfUtil.createPDF(summary);
      return pdf;
    } catch (err) {
      return null;
    };
  };

};