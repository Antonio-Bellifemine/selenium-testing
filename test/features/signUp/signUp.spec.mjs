import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { beforeEach, afterEach, it } from 'mocha';
import 'dotenv/config';
import { expect } from 'chai';
import { fillInRegistrationForm } from '../../../comands/sharedCommands.mjs';

let driver;

beforeEach('Go to the web page', async () => {
    const BASE_URL = process.env.BASE_URL;
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(`${BASE_URL}/#/register`);
});

describe('sign up a user', () => {
    it('validate existing user info can not be registered', async () => {
        await fillInRegistrationForm(driver, By, 'tester', 'test@test.com', 'password');
        const signUpButton = await driver.findElement(By.xpath("//button[text()='Sign up']"))
        // Click the button
        await signUpButton.click();
        // wait up to 1 secon for the error to show up
        await driver.manage().setTimeouts({ implicit: 1000 });
        // check the username error is shown
        const usernameError = await driver.findElement(By.xpath("//li[contains(text(),'username')]"));
        const userTextContent = await usernameError.getText();
        expect(userTextContent).to.equal('username has already been taken');
        // check the email error is shown
        const emailError = await driver.findElement(By.xpath("//li[contains(text(),'email')]"));
        const emailTextContent = await emailError.getText();
        expect(emailTextContent).to.equal('email has already been taken')
    });
    
    it('sign up a new user', async () => {
        // fillInRegistrationForm('tester', 'testyMctesty@tester.com', "password")
        const signUpButton = await driver.findElement(By.xpath("//button[text()='Sign up']"));
        // Click the button
        await signUpButton.click();
    });
    
    it('Validate new user is logged in', async () => {
    
    });
});


afterEach('Clean up', async () => {
    if (driver) {
        await driver.quit();
    }
});