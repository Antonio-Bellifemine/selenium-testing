

export const fillInRegistrationForm = async (driver, By, username, email, password) => {
    // type username
    const usernameInput = await driver.findElement(By.xpath("//input[@placeholder='Username']"));
    console.log("Username input found");
    await usernameInput.sendKeys(username);
    // type email
    const emailInput = await driver.findElement(By.xpath("//input[@placeholder='Email']"));
    await emailInput.sendKeys(email);
    // type password
    const passwordInput = await driver.findElement(By.xpath("//input[@placeholder='Password']"));
    await passwordInput.sendKeys(password);
};