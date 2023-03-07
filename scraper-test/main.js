// Write Javascript code here
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


const URL = "https://www.konnectbox.com/";

request(URL, function (err, res, body) {
	if(err)
	{
		console.log(err);
	}
	else
	{
		const arr = [];
		let $ = cheerio.load(body);
		console.log($('a'));
		// fs.writeFile('data.txt', arr, function (err) {
		// 	if(err) {
		// 		console.log(err);
		// 	}
		// 		else{
		// 			console.log("success");
		// 		}
		// });

	}
});
