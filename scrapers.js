const puppeteer = require("puppeteer");
var fs = require("fs");

var temFinalArray = [];
var tempArr1 = [];

let csvContent = "data:text/csv;charset=utf-8,";

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[2]/td[3]/strong/font[1]'
  );
  const [el2] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[5]/td[3]/font/strong[1]/font[1]'
  );
  const [el3] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[6]/td[3]/font/strong/font[1]'
  );
  const [el4] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[7]/td[3]/font/strong'
  );
  const [el5] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[8]/td[3]/strong/font[1]'
  );
  const [el6] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[1]/td/h3/font/p[2]/strong/font[2]'
  );
  const [el7] = await page.$x(
    '//*[@id="primarycontent"]/center[1]/table/tbody/tr[1]/td/h3/font/p[2]/strong/font[4]'
  );

  const src = await el.getProperty("textContent");
  const src2 = await el2.getProperty("textContent");
  const src3 = await el3.getProperty("textContent");
  const src4 = await el4.getProperty("textContent");
  const src5 = await el5.getProperty("textContent");
  const src6 = await el6.getProperty("textContent");
  const src7 = await el7.getProperty("textContent");

  var tempArray = new Array();

  tempArray.push({
    Temperature: src._remoteObject.value,
    Relative_Humidity: src2._remoteObject.value,
    Wind_Speed: src3._remoteObject.value,
    Barometric_Pressure: src4._remoteObject.value,
    Incoming_Radiation: src5._remoteObject.value,
    Date: src6._remoteObject.value,
    Time: src7._remoteObject.value,
  });
  temFinalArray = tempArray;

  //console.log(tempArray);
  const srcTxt = await src.jsonValue();

  // browser.close();
}

setInterval(function () {
  scrapeProduct("http://weather.uwaterloo.ca/default.asp");
  tempArr1.push(temFinalArray);
  console.log(tempArr1);
  var file = fs.createWriteStream("array.txt");
  file.on("error", function (err) {
    /* error handling */
  });
  tempArr1.forEach(function (v) {
    //console.log("hi", v[0]);
    file.write(JSON.stringify(v[0]) + "\n");
  });
  file.end();
}, 1000000);
