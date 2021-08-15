let cheerio = require("cheerio");
let request = require("request");
let scoreCardObj = require("./scorecard.js");
let homepage = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
// request the homepage link asynchronously , using a callback fn
request(homepage,cb);
function cb(error,response,html){
    if(error){
        console.log( error); // Print the error if one occurred

       }else if(response.statusCode==404){ // response.statuscode has http codes which have diff meanings
           console.log('page not found');
       }
    else{
        // Print the HTML for the Google homepage.n
       //  console.log('html:', html); 
       dataExtractor(html);
    }
}

function dataExtractor(html){
    // loads the html file in cheerio
    let searchtool = cheerio.load(html);
    let aElem = searchtool(".label.blue-text.blue-on-hover")
    let link = aElem.attr("href");
    let fullink = "https://www.espncricinfo.com" +link; 
    
    
    // request for the nextPage after finding element
    request(fullink,acb);
}
function acb(error,response,nhtml){
    if(error){
        console.log( error); // Print the error if one occurred

       }else if(response.statusCode==404){ // response.statuscode has http codes which have diff meanings
           console.log('page not found');
       }
    else{
        // Print the HTML for the Google homepage.n
       //  console.log('html:', html); 
       nextPage(nhtml);
    }
}

function nextPage(nhtml){
    let searchtool = cheerio.load(nhtml);
    let scoreArr  = searchtool("a[data-hover='Scorecard']");
    for(let i=0;i<scoreArr.length;i++){
            let link = searchtool(scoreArr[i]).attr("href");
            let fullpagelink = "https://www.espncricinfo.com"+link;

            scoreCardObj.psm(fullpagelink)
    }
    console.log("```````````````````````````````")
}