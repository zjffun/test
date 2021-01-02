const { Builder, By } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:5500/index.html");
    const ele = await driver.findElement(By.className("canvas"));
    let actions = driver.actions();
    // move is from element center
    await actions.move({ origin: ele, x: 0, y: 0 }).click().perform();

    actions = driver.actions();
    await actions.move({ origin: ele, x: 30, y: 40 }).click().perform();
  } finally {
    // await driver.quit();
  }
})();
