import { Builder, By, WebDriver } from 'selenium-webdriver';
import { before, after, it } from 'mocha';
import { loginUser } from '../../../api/apiCommands.mjs';

let driver;

before('Go to the web page', async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
});

it('example test', async () => {
    let title = await driver.getTitle();
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));

    await textBox.sendKeys('Selenium');
    await submitButton.click();

    // Assuming 'message' refers to some element containing text after submission
    let message = await driver.findElement(By.id('message'));  // Replace with correct locator
    let value = await message.getText();
    
    console.log('Message: ', value);

});



it('Validate Axios Implementation', async () => {
    loginUser("testTester@testing.com", "password").then(resp => {
        console.log("Here's the expected login Response -->", resp.data);
    });

});


after('Clean up', async () => {
    if (driver) {
        await driver.quit();
    }
});