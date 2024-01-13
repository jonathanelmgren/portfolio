'use server'

import puppeteer from 'puppeteer';
import ReactDOMServer from 'react-dom/server';
import { TDriversLogReport } from "../types";
import { PDFLayout } from "./PDFLayout";

export const generatePDF = async (data: TDriversLogReport) => {
    const htmlContent = ReactDOMServer.renderToString(<PDFLayout {...data} />);

    // Generate the PDF with Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({ path: 'report.pdf', format: 'A4' });

    await browser.close();
    console.log("PDF Generated");
}