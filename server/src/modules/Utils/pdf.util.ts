/* eslint-disable prettier/prettier */
import * as fs from 'fs';
import * as path from 'path';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import * as sharp from 'sharp';



export default class PDFUtil {

    constructor() { }

    async generatePDF(htmlFile: string, data: Record<string, any>) {
        try {
            // 1. Compile handlebars template
            const templatePath = path.resolve(__dirname, '../../src/templates/', htmlFile);
            const templateHtml = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(templateHtml);
            const finalHtml = template({
                acid: '1234567891011121314',
                companyName: 'john@example.com',
                importerId: '1598',
                shippingDate: '2023-06-01',
                ...data,
            });

            // 2. Launch Puppeteer and convert HTML to PDF
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

            const pdfBuffer = await page.pdf({ format: 'A4' });
            await browser.close();

            // 3. Convert PDF pages to images
            const tempPdfPath = path.resolve(__dirname, '../../src/templates/temp.pdf');
            fs.writeFileSync(tempPdfPath, pdfBuffer);

            return '';
        } catch (error) {
            console.log('error: ', error);
            throw error;
        };
    };

};