'use server'

import puppeteer from 'puppeteer';
import { TDriversLogReport } from "../types";
import { PDFLayout, PDFLayoutCSS } from "./PDFLayout/PDFLayout";

export const generatePDF = async (data: TDriversLogReport) => {
    const ReactDOMServer = (await import('react-dom/server')).default
    const htmlContent = `
    <html>
        <head>
            <style>
                ${PDFLayoutCSS}
            </style>
        </head>
        <body>
            ${ReactDOMServer.renderToString(<PDFLayout {...data} />)}
        </body>
    </html>
`;

    // Generate the PDF with Puppeteer
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.addStyleTag({ content: PDFLayoutCSS })
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', landscape: true, });
    const parsedPDF = JSON.parse(JSON.stringify(pdf))

    await browser.close();
    return parsedPDF
}