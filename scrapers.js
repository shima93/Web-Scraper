const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[2]/td[3]/strong/font[1]'
  );

  const src = await el.getProperty("textContent");
  console.log(src._remoteObject.value);
  const srcTxt = await src.jsonValue();

  // browser.close();
}

setInterval(function () {
  scrapeProduct("http://weather.uwaterloo.ca/default.asp");
}, 53000000);
