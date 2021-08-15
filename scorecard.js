let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");
// getting the link for each scorecard

function processSingleMatch(url){

    request(url,cb);
}
// requesting scorecard page to access data
function cb(error,response,html){
    if(error){
        console.log( error); // Print the error if one occurred

       }else if(response.statusCode==404){ // response.statuscode has http codes which have diff meanings
           console.log('page not found');
       }
    else{
        // Print the HTML for the Google homepage.n
       //  console.log('html:', html); 
       scorecard(html);
    }
}
//
function scorecard(html){
    let searchtool = cheerio.load(html);
    let teamsArr = searchtool(".Collapsible");
    let content = "";
    for(let i=0;i<teamsArr.length;i++){
         let teamNameElem = searchtool(teamsArr[i]).find("h5");
         let teamName = teamNameElem.text();
         teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        console.log(teamName);
        let playerArr = searchtool(teamsArr[i]).find(".table.batsman tbody tr");
        console.log(playerArr.length);
        for(let j=0;j<playerArr.length;j++){
            let Numberoftd = searchtool(playerArr[j]).find("td");
            if(Numberoftd.length == 8){
                let playerName = searchtool(Numberoftd[0]).text()
                console.log(playerName)
            }
           
        }
        console.log("``````````````````````````````````");
    }
}


module.exports={
    psm:processSingleMatch
}