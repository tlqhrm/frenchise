const { default: axios } = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
num = new Array(50).fill(0);


let courses = [];
(async function() {


for await (idx of num.keys()){
// console.log(idx);
const index = idx +1;
const getHTML = async() => {
  try {
    return await axios.get("https://www.subway.co.kr/storeSearch?page="+index+"&rgn1Nm=&rgn2Nm=#storeList")
  } catch(err) {
 console.log(err)
  }
}

const parsing = async () => {
  const html = await getHTML();
  const $ = cheerio.load(html.data);
  const $courseList = $("tr");

  
  $courseList.each((idx, el) => {
    const title = $(el).find("td:eq(1) a").text()
    if(idx != 0){
      console.log(index);
      console.log(title)
      courses.push("서브웨이" + title)
    }
    
  })
}
await parsing();
}
fs.writeFileSync("서브웨이.json",JSON.stringify(courses))
})();
