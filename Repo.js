const request=require("request");
const cheerio=require("cheerio");
const getisuuePage=require("./issue")
function getRepoPage(url,topic)
{
    request(url,cb);
    function cb(err,res,html){
        if(err)
        {
            console.log(err);
        }
        else{
             getRepoLink(html);
           
        }
    }
    function getRepoLink(html)
    {
      let $= cheerio.load(html);
      let heading =$(".f3.color-text-secondary.text-normal.lh-condensed");
      
// console.log(topic);
   for(let i=0;i<heading.length;i++)
   {
       let twolinks=$(heading[i]).find("a");
      let link= $(twolinks[1]).attr("href");
        //  console.log(link);
        let fulllink=`https://github.com${link}/issues`;
       
        let reponame=link.split("/").pop();
        //  console.log(reponame);
           getisuuePage(fulllink,topic,reponame);
   }
    }
}
module.exports = getRepoPage;