const request=require("request");
const cheerio=require("cheerio");
const  fs=require("fs");
const path =require("path")
const pdfkit =require('pdfkit');

function getisuuePage(url,topic,reponame)
{
    request(url,cb);
    function cb(err,res,html){
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log(html);
            getissue(html);
        }
    }
    function getissue(html){
        let $ =cheerio.load(html);
         let issue = $(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
        console.log(issue.length);
        let arr=[];
        for(let i=0;i<issue.length;i++)
        {
            let twolinks=$(issue[i]).find("a");
            let link= $(twolinks[0]).attr("href");
            //    console.log(link);
            link=`https://github.com${link}`;
            arr.push(link);   

        }
        let folderpath =path.join(__dirname,topic);
        dirCreater(folderpath);
        let filepath=path.join(folderpath,reponame+".pdf");
        let text= JSON.stringify(arr);
       let pdfDoc=new pdfkit();
       pdfDoc.pipe(fs.createWriteStream(filepath)),{lineBreak:false};
        pdfDoc.text(text);
        pdfDoc.end();
        // fs.writeFileSync(filepath,);
         
    }

}
module.exports = getisuuePage;
function dirCreater(folderpath){
 
  if(fs.existsSync(folderpath)==false)
  {
       fs.mkdirSync(folderpath);
  }
}