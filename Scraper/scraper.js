const { Builder, By, until } = require("selenium-webdriver");
let base_URL = "https://www.seasonalfoodguide.org/";
let state = document.getElementById("state").value;
let month = document.getElementById("month").value;
let full_url = base_URL + state + "/" + month;
var elements = [];


async function scraper() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(full_url);
  elements = await driver.findElements(By.className("card_title"));
}
scraper()
