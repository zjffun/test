const fs = require("fs");
const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    let buff = null;
    await driver.get("http://127.0.0.1:5500/index.html");
    // await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    // await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
    const ele = await driver.findElement(By.className("canvas"));

    // driver.executeScript("return arguments[0].toDataURL('image/png').substring(21);", canvas);
    const canvasB64 = await driver.executeScript(
      "return arguments[0].toDataURL('image/png').substring(22)",
      ele
    );

    buff = Buffer.from(canvasB64, "base64");
    fs.writeFileSync("./dist/canvas.png", buff);
    const screenB64 = await driver.takeScreenshot();
    buff = Buffer.from(screenB64, "base64");
    fs.writeFileSync("./dist/screen.png", buff);
  } finally {
    // await driver.quit();
  }
})();
