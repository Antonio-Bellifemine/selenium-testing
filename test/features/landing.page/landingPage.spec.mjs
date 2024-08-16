import { Builder, By, WebDriver } from 'selenium-webdriver';
import { before, after, it, describe } from 'mocha';
import { loginUser } from '../../../api/apiCommands.mjs';
import 'dotenv/config'
import { expect } from 'chai';

let driver;

beforeEach('Go to the web page', async () => {
    const BASE_URL = process.env.BASE_URL;
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(`${BASE_URL}`);
});

describe('public landing page is as expected', () => {
    const clickSignInButton = async () => {
        const signInButton = await driver.findElement(By.xpath("//a[@href='#/login']"));
        await signInButton.click();
    }  
    
    
    it('Validate Sign in button goes to correct page', async () => {
        clickSignInButton();
    });
    
    it('Validate Home button goes to correct page', async () => {
        clickSignInButton();
        const homeButton = await driver.findElement(By.xpath("//a[@href='#/']"));
        await homeButton.click();
    });
    
    it('Validate Sign up button goes to correct page', async () => {
        // click the register button
        const registerButton = await driver.findElement(By.xpath("//a[@href='#/register']"));
        await registerButton.click();
        // check sign up header is visible
        const signUpHeaderText = await driver.findElement(By.xpath("//h1[text()='Sign up']"));
        const signUpHeaderTextIsVisible = await signUpHeaderText.isDisplayed();
        expect(signUpHeaderTextIsVisible).to.be.true;
        // check the username input is visible
        const usernameInput = await driver.findElement(By.xpath("//input[@placeholder='Username']"));
        await usernameInput.isDisplayed();
        // check email input is visible
        const emailInput = await driver.findElement(By.xpath("//input[@placeholder='Email']"));
        await emailInput.isDisplayed();
        // check password input is visible
        const passworInput = await driver.findElement(By.xpath("//input[@placeholder='Password']"));
        const passwordInputIsVisible = await passworInput.isDisplayed();
        expect(passwordInputIsVisible).to.be.true;
    });
    
    // it('Validate Axios Implementation', async () => {
    //     loginUser("testTester@testing.com", "password").then(resp => {
    //         console.log("Here's the expected login Response -->", resp.data);
    //     });
    
    // });
    
    
});

afterEach('Clean up', async () => {
    if (driver) {
        await driver.quit();
    }
});