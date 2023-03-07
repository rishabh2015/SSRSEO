const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.konnectbox.com/');
    await page.waitFor(10000);
    // await autoScroll(page);
    // await scrollToBottom(page);
    let originalOffset = 0;
while (true) {
    await page.evaluate('window.scrollBy(0, document.body.scrollHeight)');
    await page.waitForTimeout(200);
    let newOffset = await page.evaluate('window.pageYOffset');
    if (originalOffset === newOffset) {
        break;
    }
    originalOffset = newOffset;
}
    browser.close();
    return result;
};

async function scrollToBottom(page) {
    const distance = 100; // should be less than or equal to window.innerHeight
    const delay = 100;
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await page.waitFor(delay);
    }
  }
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                console.log("in here");
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

scrape().then((value) => {
    console.log(value); // Success!
});