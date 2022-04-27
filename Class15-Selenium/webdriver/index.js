const { Builder, By, EC, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('./chromedriver.exe');
const driver = new Builder().forBrowser('chrome').setChromeService(service).build();

(async function playRickAstley() {
  try {
    await driver.get('https://www.youtube.com');
    await driver.manage().setTimeouts({ implicit: 1000 });
    driver.manage().window().maximize();
    const searchBox = await driver.findElement(By.name('search_query'));
    const searchButton = await driver.findElement(By.id('search-icon-legacy'));
    await searchBox.sendKeys('Never gonna give you up');
    await searchButton.click();
    const video = await driver.findElement(By.css('div#contents ytd-item-section-renderer>div#contents a#thumbnail'));
    console.log(video);
    await video.click();
    try {
      await driver.wait(() => false, 180000);
    } catch {}
    await driver.quit();
  } catch (error) {
    console.error(error);
  }
})();
