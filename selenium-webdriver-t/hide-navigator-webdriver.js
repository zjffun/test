const { Builder } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  // 刷新页面会变回 true
  let commandResult;
  commandResult = await driver.sendDevToolsCommand(
    "Page.addScriptToEvaluateOnNewDocument",
    {
      source: `
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
      `,
    }
  );
  console.log(commandResult);

  try {
    await driver.get("http://127.0.0.1:5500/index.html");
  } finally {
    // await driver.quit();
  }
})();
