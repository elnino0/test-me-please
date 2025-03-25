const { expect } = require('chai');
const puppeteer = require('puppeteer');
/* this is end to end testing
although we are not testing the backend we are testing the frontend we use the backend for the sake of the frontend
the backend being used here 
the first end is the UI that get answer from the backend so we are testing the backend as well */
const positiveTestData =[{num1: 10, num2: 5, operator: '+' , result: 15}]
const nagativeTestData =[{num1: 10, num2: 0, operator: '/' , result: 5, error: 'Division by zero is not allowed'}]

describe('E2E Tests', function (){
 this.timeout(5000 * 1000); 

 positiveTestData.forEach(element => {
    it('should calculate correctly', async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.type('#num1', element.num1.toString());
        await page.type('#num2', element.num2.toString());
        await page.select('#operator', element.operator);
        await page.click('#root > div > main > div > button');
        await page.waitForSelector('#root > div > main > div > div.result > p > strong');
        const result = await page.$eval('#root > div > main > div > div.result > p > strong', el => el.textContent);
        expect(result).to.equal(element.result.toString());
        await browser.close();
    })        
    });

    nagativeTestData.forEach(element => {
        it('should handle invalid input', async () => {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto('http://localhost:3000');
            await page.type('#num1', element.num1.toString());
            await page.type('#num2', element.num2.toString());
            await page.select('#operator', element.operator);
            await page.click('#root > div > main > div > button');
            await page.waitForSelector('#root > div > main > div > div.result.error > p');
            const result = await page.$eval('#root > div > main > div > div.result.error > p', el => el.textContent);
            expect(result).to.equal(element.error);
            await browser.close();
        })        
    })

});