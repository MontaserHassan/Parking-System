/* eslint-disable prettier/prettier */
import * as fs from 'fs';
import * as path from 'path';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';



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

    async createPDF(text: string): Promise<string> {
        try {
            const pdfDoc = await PDFDocument.create();
            let page = pdfDoc.addPage([1000, 600]);
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const fontSize = 12;
            const lineHeight = 20;
            const margin = 50;
            const maxWidth = 900;
            let y = page.getHeight() - margin;

            function wrapText(text: string): string[] {
                const words = text.split(' ');
                const lines: string[] = [];
                let currentLine = '';

                for (const word of words) {
                    const width = font.widthOfTextAtSize(
                        (currentLine ? currentLine + ' ' : '') + word,
                        fontSize,
                    );
                    if (width < maxWidth) {
                        currentLine += (currentLine ? ' ' : '') + word;
                    } else {
                        lines.push(currentLine);
                        currentLine = word;
                    }
                }
                if (currentLine) lines.push(currentLine);
                return lines;
            }
            for (const rawLine of text.split('\n')) {
                const wrappedLines = wrapText(rawLine);

                for (const line of wrappedLines) {
                    // create new page if out of space
                    if (y < margin) {
                        page = pdfDoc.addPage([1000, 600]);
                        y = page.getHeight() - margin;
                    }

                    page.drawText(line, {
                        x: margin,
                        y,
                        font,
                        size: fontSize,
                        color: rgb(0, 0, 0),
                    });

                    y -= lineHeight;
                }

                // extra space for original line breaks
                y -= 10;
            }

            return Buffer.from(await pdfDoc.save()).toString('base64');
        } catch (err) {
            return null;
        };
    };

};