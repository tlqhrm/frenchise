const { default: axios } = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const qs = require('qs');
const fs = require('fs');
/// gs25는 크롤링 필요 x


const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));


const sigungudong = JSON.parse(fs.readFileSync('./cu-행정구역.json','utf-8'));

const 경기도 = JSON.parse(fs.readFileSync('./경기도.json','utf-8'));
const 경남부산= JSON.parse(fs.readFileSync('./경남부산.json','utf-8'));
const 경북강원충북 = JSON.parse(fs.readFileSync('./경북강원충북.json','utf-8'));
const 대구전북전남 = JSON.parse(fs.readFileSync('./대구전북전남.json','utf-8'));
const 대전광주울산 = JSON.parse(fs.readFileSync('./대전광주울산.json','utf-8'));
const 서울 = JSON.parse(fs.readFileSync('./서울.json','utf-8'));
const 인천충남 = JSON.parse(fs.readFileSync('./인천충남.json','utf-8'));
const 제주세종 = JSON.parse(fs.readFileSync('./제주세종.json','utf-8'));

let cuArray=[];

async function cu(sido,sigungu,dong,page) {
  let body = {
    'pageIndex': page,
    'listType': "", 
    'jumpoCode': "",
    'jumpoLotto': "",
    'jumpoToto': "",
    'jumpoCash': "",
    'jumpoHour': "",
    'jumpoCafe': "",
    'jumpoDelivery': "",
    'jumpoBakery': "",
    'jumpoFry': "",
    'jumpoMultiDevice': "",
    'jumpoPosCash': "",
    'jumpoBattery': "",
    'jumpoAdderss': "",
    'jumpoSido': sido,
    'jumpoGugun': sigungu,
    'jumpodong': dong,
    'user_id': "",
    'sido':'',
    'Gugun': '',
    'jumpoName': ""
    }

    await axios({
      method: 'POST',
      url: "https://cu.bgfretail.com/store/list_Ajax.do",
      headers: { 'content-type': 'application/x-www-form-urlencoded',"Accept-Language": "ko,en;q=0.9,ko-KR;q=0.8,en-US;q=0.7"},
      data: qs.stringify(body)
    }).then((response) => {
      const $ = cheerio.load(response.data);
      const titles = $(".name");

      if(titles.length == 0){
        return;
      }else  if(titles.length < 5) {
        for(title of titles){
          cuArray.push("CU"+title.children[0].data);
          console.log(title.children[0].data)
        }
        return;
      }else {
        for(title of titles){
          cuArray.push("CU"+title.children[0].data);
          console.log(title.children[0].data)
        }
        cu(sido,sigungu,dong,page+1);
      }
      // console.log(titles)
      
    })
    // .catch(err => {
      // (async function() {
      //   for (data of sigungudong){
      //     let num = 1;
      //     await cu(data["시도"], data["시군구"],data["동읍면"],1);
          
      //     if(num % 300 == 0) {
      //       await wait(1000)
      //     }
      //     num++;
      //   }
      //   fs.writeFileSync("cu.json",JSON.stringify(cuArray))
      // })();
    // })
    // console.log(cuArray)
}
// cu("경기도","화성시","반월동",1)
// console.log(JSON.parse(sigungudong).length)

(async function() {
  // for (data of 경기도){
  //   let num = 1;
  //   await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
  //   if(num % 300 == 0) {
  //     await wait(1000)
  //   }
  //   num++;
  // }

  // fs.writeFileSync("경기도-cu.json",JSON.stringify(cuArray))
  // cuArray = [];
  // await wait(5000)

  // for (data of 경남부산){
  //   let num = 1;
  //   await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
  //   if(num % 300 == 0) {
  //     await wait(1000)
  //   }
  //   num++;
  // }
  // fs.writeFileSync("경남부산-cu.json",JSON.stringify(cuArray))
  // cuArray = [];

  // await wait(5000)
  // for (data of 경북강원충북){
  //   let num = 1;
  //   await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
  //   if(num % 300 == 0) {
  //     await wait(1000)
  //   }
  //   num++;
  // }

  // fs.writeFileSync("경북강원충북-cu.json",JSON.stringify(cuArray))
  // cuArray = [];

  // await wait(5000)
  // for (data of 대구전북전남){
  //   let num = 1;
  //   await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
  //   if(num % 300 == 0) {
  //     await wait(1000)
  //   }
  //   num++;
  // }

  // fs.writeFileSync("대구전북전남-cu.json",JSON.stringify(cuArray))
  // cuArray = [];

  // await wait(5000)
  // for (data of 대전광주울산){
  //   let num = 1;
  //   await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
  //   if(num % 300 == 0) {
  //     await wait(1000)
  //   }
  //   num++;
  // }

  // fs.writeFileSync("대전광주울산-cu.json",JSON.stringify(cuArray))
  // cuArray = [];

  // await wait(5000)
  for (data of 서울){
    let num = 1;
    await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
    if(num % 300 == 0) {
      await wait(1000)
    }
    num++;
  }

  fs.writeFileSync("서울-cu.json",JSON.stringify(cuArray))
  cuArray = [];

  await wait(5000)
  for (data of 인천충남){
    let num = 1;
    await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
    if(num % 300 == 0) {
      await wait(1000)
    }
    num++;
  }

  fs.writeFileSync("인천충남-cu.json",JSON.stringify(cuArray))
  cuArray = [];

  // await wait(5000)
  // for (data of 제주세종){
  //   let num = 1;
  //   await cu(data["시도"], data["시군구"],data["동읍면"],1);
    
  //   if(num % 300 == 0) {
  //     await wait(1000)
  //   }
  //   num++;
  // }

  // fs.writeFileSync("제주세종-cu.json",JSON.stringify(cuArray))
  // cuArray = [];
  // fs.writeFileSync("cu.json",JSON.stringify(cuArray))
})();







