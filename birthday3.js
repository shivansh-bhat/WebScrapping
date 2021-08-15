// get birthdays of players
let request = require('request');
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
let bowler= searchtool(".table.bowler tbody tr");

for(let i=0;i<bowler.length;i++){
    let cols = searchtool(bowler[i]).find("td");        // td is table data 
    let aElem = searchtool(cols[0]).find("a");          // get the anchor tag
    let link = aElem.attr("href");                // link of the page containing player info. is "href" attribute of anchor tag
   let fullink = "https://www.espncricinfo.com/" + link;
   
   // request for the new page link
   request(fullink,newcb);
    
}
}
function newcb(error,response,html){
    if(error){
        console.log( error); // Print the error if one occurred

       }else if(response.statusCode==404){ // response.statuscode has http codes which have diff meanings
           console.log('page not foung');
       }
    else{
        // Print the HTML for the player info page
       //  console.log('html:', html); 
       birthdayExtractor(html);
    }
}

function birthdayExtractor(html){
let searchtool = cheerio.load(html);
let infoArr = searchtool(".player-card-description");
let name = searchtool(infoArr[0]).text();
let Age = searchtool(infoArr[2]).text();
console.log(name ," " ,Age);
}

console.log("after");