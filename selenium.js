const webdriver = require("selenium-webdriver");
const By = require("selenium-webdriver").By;
const cheerio = require("cheerio");
const request = require("request");

const tbody = document.querySelector(".tbody");

(async function getData() {
  let data = [];
  const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build(); // 기본 설정

  const url = "http://prod.danawa.com/list/?cate=112752&15main_11_02";
  await driver.get(url); // 접속

  const maker = await driver.findElement(By.id("searchMakerRep702")).click();
  const category = await driver.findElement(By.id("searchAttributeValue164333")).click();
  const device = await driver.findElement(By.id("searchAttributeValue1223")).click();
  const capacity = await driver.findElement(By.id("searchAttributeValueRep1248")).click();

  await driver.sleep(2000);

  const ul = await driver.findElement(By.css(".main_prodlist .product_list"));
  const li = await ul.findElements(By.css(".prod_item"));

  await li.map((element) => {
    let title = element.findElement(By.name("productName"));
    let price = element.findElement(By.css(".price_sect a"));
    data.push({ title: title.getText(), price: price.getText() });
    console.log(title.getText(), price.getText());
  });
})();
