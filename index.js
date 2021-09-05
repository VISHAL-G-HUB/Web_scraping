let url="https://github.com/topics"
const request=require("request");
const cheerio=require("cheerio");
request(url,cb); 
const getRepoPage =require("./Repo.js");
function cb(err,res,html)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        //console.log(html);
        gettopic(html);
    }
}
function gettopic(html)
{
    //console.log("q");
   let $=cheerio.load(html);
   let link =$(".no-underline.d-flex.flex-column.flex-justify-center");
  // console.log(link);
   for(let i=0;i<link.length;i++)
   {
       let href=$(link[i]).attr("href");
        let topic=href.split("/").pop();
         let fulllink = `https://github.com${href}`;
        
        getRepoPage(fulllink, topic);
   }






}