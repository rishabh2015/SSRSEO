const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();
const args = process.argv;
var port = args[2];


app.get('*', async (req, res) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--ignore-certificate-errors',
          '--enable-features=NetworkService',
          '--disable-web-security'
        ]
      });
    try {
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Mobile Safari/537.36');
        const local_url = 'https://www.konnectbox.com' + req.originalUrl;
        try {
            await page.goto(local_url, { waitUntil: 'networkidle0'});
          }
          catch (e) {
            // logger.error(e.stack);
          }
          finally {
            try {
                if (page && (!page.isClosed())) {
                  await page.evaluate(() => {
                    try {
                      //remove all the sript tags except the schema ones
                    //    document.querySelectorAll('script:not([type="application/ld+json"])').forEach((obj) => obj.remove());
                      document.querySelectorAll('script[type="module"]').forEach((obj) => obj.remove());
                    //   document.querySelectorAll('link[as="script"]').forEach((obj) => obj.remove());
                    } catch (scriptErr) {
                    //   logger.error(scriptErr + " " + dummy);
                    }
                    return document.documentElement.innerHTML;
                  });
                  const body = await page.content();
                  res.send(body);
                  page.removeAllListeners('response');
                }
            }
        catch (e) {
        //   logger.error(e + " " + dummy);
        }
        }




        // await page.goto(local_url, { waitUntil: 'networkidle0', timeout: 10000 });
        // // await page.waitForTimeout(5 * 1000);
      
        // const html = await page.evaluate(() => {
                
        //     return document.querySelector('*').outerHTML
        // });
        // // const data = await page.evaluate(() => document.querySelector('*').outerHTML);

        // // console.log(data);

        
        // res.send(html);
    } catch (err) {
        await browser.close();
    } finally {
        await browser.close();
    }
});

app.listen(port, () => console.log(`Server is up`))