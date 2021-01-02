const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");

(async function example() {
  let options = new chrome.Options();

  options.addArguments("user-agent=test");
  options.addArguments("window-size=1920,1080");
  options.addArguments("force-device-scale-factor=1.5");
  
  // options.addArguments("--headless");
  // options.addArguments("--disable-web-security");
  // options.addArguments("--disable-notifications");
  // options.addArguments("--autoplay-policy=no-user-gesture-required");
  // options.addArguments("--disable-popup-blocking");
  // options.addArguments("--disable-bundled-ppapi-flash");

  // options.setUserPreferences({
  //   "plugins.plugins_disabled": ["Shockwave Flash"],
  //   "profile.default_content_setting_values.notifications": 2,
  //   "profile.password_manager_enabled": false,
  //   credentials_enable_service: false,
  // });

  let chromeCapabilities = webdriver.Capabilities.chrome();
  let chromeOptions = {
    acceptSslCerts: true,
    acceptInsecureCerts: true,
    excludeSwitches: ["--enable-automation"],
    ignoreDefaultArgs: ["--enable-automation"],
    useAutomationExtension: false,
  };
  chromeCapabilities.set("chromeOptions", chromeOptions);

  const serviceBuilder = new chrome.ServiceBuilder(this.driverPath);

  const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .setChromeOptions(options)
    .setChromeService(serviceBuilder)
    .build();

  // await driver.executeScript("Network.setUserAgentOverride", {
  //   userAgent:
  //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.53 Safari/537.36",
  // });
  // await this.driver.executeScript(
  //   "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
  // );

  await driver.get("http://127.0.0.1:5500/index.html");
})();
