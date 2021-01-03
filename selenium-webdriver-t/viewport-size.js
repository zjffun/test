const { Builder } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:5500/index.html");

    let commandResult;
    commandResult = await driver.sendDevToolsCommand(
      "Page.setDeviceMetricsOverride", // DEPRECATED
      {
        width: 1024,
        height: 768,
        deviceScaleFactor: 1.5,
        mobile: true,
        viewport: {
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          scale: 1,
        },
      }
    );
  } finally {
    // await driver.quit();
  }
})();
