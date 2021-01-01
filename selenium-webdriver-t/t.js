const fs = require("fs");
const { Builder, By } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  // 刷新页面会变回 true
  let commandResult 
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
    const ele = await driver.findElement(By.className("canvas"));

    const canvasB64 = await driver.executeScript(
      "return arguments[0].toDataURL('image/png').substring(22)",
      ele
    );

    let buff = null;
    buff = Buffer.from(canvasB64, "base64");
    fs.writeFileSync("./dist/canvas.png", buff);
    const screenB64 = await driver.takeScreenshot();
    buff = Buffer.from(screenB64, "base64");
    fs.writeFileSync("./dist/screen.png", buff);
  } finally {
    // await driver.quit();
  }
})();
