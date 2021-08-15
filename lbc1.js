let request = require('request');
let cheerio = require('cheerio');
console.log("before");
// this is an async funtion
let url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary'; 
request(url,cb);// cb is callback function
// async function
 function cb(error, response, html) {           // 3 parameters 
     if(error){
         console.log( error); // Print the error if one occurred

        }else if(response.statusCode==404){ // response.statuscode has http codes which have diff meanings
            console.log('page not foung');
        }
     else{
         // Print the HTML for the Google homepage.n
        //  console.log('html:', html); 
        dataExtractor(html);
     }
}
function dataExtractor(html){
    //first we load the html file
// search tool to search an element using a selector,
let searchtool = cheerio.load(html);
// css selector -element
//you always cant get unique selectors, then use an array
let elementArr = searchtool(".match-comment-wrapper .match-comment-long-text");
// getting an array of bowling commentary until the page is loaded 
// cram this-> cram
let lbc = searchtool(elementArr[0]).text();
//elementArr[0] = is an array an doesnt have a text fn so its again put in th search tool
console.log("last commentary",lbc);
}
console.log("after");