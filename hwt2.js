// request module npm   
let request = require('request');
// cheerio module npm
let cheerio = require('cheerio');
console.log("before");
// this is an async funtion
let url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard'; 
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
let bowler= searchtool(".table.bowler tbody tr")       // we get 2 tables refering to same class

let hwt = 0;                                    // let highest wickets be 0
let playername = "";                            // variable to store playername
for(let i=0;i<bowler.length;i++){
    let cols = searchtool(bowler[i]).find("td");        // td is table data 
    let name = searchtool(cols[0]).text();
    let wickets = searchtool(cols[4]).text();
    if(wickets>=hwt){
        hwt = wickets;
        playername = name;
    }
    console.log(name+" " + wickets);
}
console.log("*************************************************")
console.log("Highest wicket taker is "+playername+" taking " +hwt+ " wickets");

}
console.log("after");