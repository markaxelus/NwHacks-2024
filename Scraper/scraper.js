const { Builder, By, until } = require("selenium-webdriver");

async function scraper() {
// launch the browser
  let driver = await new Builder().forBrowser("chrome").build();
  //navigate to facebook login page
  await driver.get("https://www.seasonalfoodguide.org/");
  // Select input elements and fill them out
  let elements = await driver.findElements(By.className("card_title"));
  // Select login button and invoke click action
  for (let i=0; i<elements.length; i++) {
    elements[i].getText().then(function (text) {
      console.log(text);
   });
  }
}
scraper()
